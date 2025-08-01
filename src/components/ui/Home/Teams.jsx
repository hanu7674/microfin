import React, { useEffect, useState } from 'react';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';
import { 
  Button, 
  Modal, 
  Form, 
  Input, 
  IconButton, 
  Loader, 
  Panel, 
  Stack, 
  Grid, 
  Row, 
  Col,
  Table,
  Message,
  Divider,
  Header,
  Container,
  FlexboxGrid
} from 'rsuite';
import { FaEdit, FaTrash, FaPlus, FaUsers, FaGithub, FaUserPlus, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  fetchTeamMembers, 
  addTeamMember, 
  updateTeamMember, 
  deleteTeamMember 
} from '../../../redux/team';
import { notify } from 'reapop';
import { withAuthentication } from '../../../Session';

const { Cell, HeaderCell, Column } = Table;

function Teams() {
  const { theme } = useTheme();
  const {
    cardBg,
    cardText,
    borderColor,
    shadow,
    textMain,
    bgSection,
    muted,
    primary,
    success,
    warning,
    error
  } = getThemeVars(theme);

  const dispatch = useDispatch();
   const { teamMembers, loading, teamError } = useSelector(state => state.team);
   
  const [stats, setStats] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', github: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch team members from Firebase
  useEffect(() => {
       dispatch(fetchTeamMembers());
    
  }, [dispatch]);

  // Fetch GitHub stats for team members
  useEffect(() => {
    teamMembers.forEach(member => {
      fetch(`https://api.github.com/users/${member.github}`)
        .then(res => res.json())
        .then(data => {
          if (data.message && data.message.includes('API rate limit exceeded')) {
            setStats(prev => ({ ...prev, [member.github]: { error: 'Rate limit exceeded' } }));
          } else {
            setStats(prev => ({ ...prev, [member.github]: data }));
          }
        })
        .catch(error => {
          setStats(prev => ({ ...prev, [member.github]: { error: 'Failed to fetch' } }));
        });
    });
  }, [teamMembers]);

  const handleAddMember = () => {
    setEditingMember(null);
    setFormData({ name: '', role: '', github: '' });
    setShowModal(true);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setFormData({ name: member.name, role: member.role, github: member.github });
    setShowModal(true);
  };

  const handleDeleteMember = async (id) => {
    try {
      await dispatch(deleteTeamMember(id)).unwrap();
      notify({ message: 'Team member deleted successfully', status: 'success' });
    } catch (error) {
      notify({ message: `Failed to delete team member: ${error}`, status: 'error' });
    }
  };

  const handleSaveMember = async () => {
    if (!formData.name || !formData.role || !formData.github) {
      notify({ message: 'Please fill all fields', status: 'error' });
      return;
    }

    try {
      if (editingMember) {
        await dispatch(updateTeamMember({ 
          id: editingMember.id, 
          memberData: formData 
        })).unwrap();
        notify({ message: 'Team member updated successfully', status: 'success' });
      } else {
        await dispatch(addTeamMember(formData)).unwrap();
        notify({ message: 'Team member added successfully', status: 'success' });
      }
      
      setShowModal(false);
      setFormData({ name: '', role: '', github: '' });
    } catch (error) {
      notify({ message: `Failed to save team member: ${error}`, status: 'error' });
    }
  };

  // Filter and sort team members
  const filteredAndSortedMembers = teamMembers
    .filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.github.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });



  return (
    <div style={{margin: '5%'}}>
    <Container fluid>
      <Container >
        
        {/* Header */}
        <Header style={{ marginBottom: 32 }}>
          <FlexboxGrid justify="space-between" align="middle">
            <FlexboxGrid.Item>
              <Stack spacing={12} alignItems="center">
                <FaUsers size={32} color={primary} />
                <div>
                  <h1 style={{ fontSize: 32, fontWeight: 700, color: textMain, margin: 0 }}>
                    Team Management
                  </h1>
                  <p style={{ color: muted, margin: 0, fontSize: 16 }}>
                    Manage your team members and their roles
                  </p>
                </div>
              </Stack>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Button 
                appearance="primary" 
                size="lg" 
                onClick={handleAddMember}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                disabled={loading}
              >
                <FaUserPlus size={16} /> Add Team Member
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>

        {/* Search and Stats */}
        <Row style={{ marginBottom: 24 }}>
          <Col xs={24} md={12}>
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={setSearchTerm}
              prefix={<FaSearch />}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Stack spacing={16} justifyContent="flex-end">
              <div style={{ color: muted }}>
                Total Members: <strong>{teamMembers.length}</strong>
              </div>
              <div style={{ color: muted }}>
                Showing: <strong>{filteredAndSortedMembers.length}</strong>
              </div>
            </Stack>
          </Col>
        </Row>

        {/* Error Message */}
        {teamError && (
          <Message type="error" style={{ marginBottom: 24 }}>
            <strong>Error:</strong> {teamError}
          </Message>
        )}

        {/* Loading State */}
        {loading && teamMembers.length === 0 ? (
          <Panel style={{ textAlign: 'center', padding: '64px 0' }}>
            <Loader size="lg" content="Loading team members..." />
          </Panel>
        ) : (
          <>
            {/* Team Members Grid */}
            <Grid fluid >
              <Row gutter={24}>
                {filteredAndSortedMembers.map(member => {
                  const stat = stats[member.github];
                  return (
                    <Col xs={24} sm={12} md={8} lg={6} key={member.id} style={{ marginBottom: 16 }}>
                      <Panel 
                        style={{ 
                          background: cardBg, 
                          border: `1px solid ${borderColor}`,
                          borderRadius: 12,
                          boxShadow: shadow,
                          height: '100%',
                          position: 'relative'
                        }}
                      >
                        {/* Admin Actions */}
                        <div style={{ 
                          position: 'absolute', 
                          top: 12, 
                          right: 12, 
                          display: 'flex', 
                          gap: 4 
                        }}>
                          <IconButton
                            icon={<FaEdit />}
                            size="xs"
                            onClick={() => handleEditMember(member)}
                            style={{ background: 'rgba(0,0,0,0.1)', color: cardText }}
                            disabled={loading}
                          />
                          <IconButton
                            icon={<FaTrash />}
                            size="xs"
                            onClick={() => handleDeleteMember(member.id)}
                            style={{ background: 'rgba(255,0,0,0.1)', color: error }}
                            disabled={loading}
                          />
                        </div>

                        {/* Member Info */}
                        <Stack direction="column" spacing={16} alignItems="center">
                          <img 
                            src={stat?.avatar_url || 'https://avatars.githubusercontent.com/u/1?v=4'} 
                            alt={member.name} 
                            style={{ 
                              width: 80, 
                              height: 80, 
                              borderRadius: '50%', 
                              objectFit: 'cover', 
                              border: `2px solid ${borderColor}` 
                            }} 
                          />
                          
                          <div style={{ textAlign: 'center' }}>
                            <h3 style={{ 
                              fontSize: 18, 
                              fontWeight: 600, 
                              color: cardText, 
                              margin: '0 0 4px 0' 
                            }}>
                              {member.name}
                            </h3>
                            <p style={{ 
                              color: muted, 
                              fontSize: 14, 
                              margin: '0 0 8px 0' 
                            }}>
                              {member.role}
                            </p>
                            <a 
                              href={`https://github.com/${member.github}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={{ 
                                color: primary, 
                                fontWeight: 500, 
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 4
                              }}
                            >
                              <FaGithub size={14} />
                              @{member.github}
                            </a>
                          </div>

                          {/* GitHub Stats */}
                          {stat && !stat.error ? (
                            <div style={{ 
                              fontSize: 12, 
                              color: cardText, 
                              textAlign: 'center',
                              width: '100%',
                            }}>
                                <div style={{ fontSize: 15, color: cardText, textAlign: 'center' }}>
                      <div>Followers: <b>{stat.followers}</b></div>
                      <div>Public Repos: <b>{stat.public_repos}</b></div>
                      <div>Location: {stat.location || 'N/A'}</div>
                    </div>
                              
                            </div>
                          ) : (
                            <div style={{ color: muted, fontSize: 12 }}>
                              {stat?.error || 'Loading stats...'}
                            </div>
                          )}
                        </Stack>
                      </Panel>
                    </Col>
                  );
                })}
              </Row>
            </Grid>

            {/* Empty State */}
            {filteredAndSortedMembers.length === 0 && !loading && (
              <Panel style={{ textAlign: 'center', padding: '64px 0' }}>
                <FaUsers size={64} style={{ opacity: 0.3, marginBottom: 16 }} />
                <h3 style={{ color: muted, marginBottom: 8 }}>No team members found</h3>
                <p style={{ color: muted, marginBottom: 16 }}>
                  {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first team member.'}
                </p>
                {!searchTerm && (
                  <Button appearance="primary" onClick={handleAddMember}>
                    <FaUserPlus size={14} style={{ marginRight: 8 }} />
                    Add First Member
                  </Button>
                )}
              </Panel>
            )}
          </>
        )}
      </Container>

      {/* Add/Edit Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} size="sm">
        <Modal.Header>
          <Modal.Title>
            {editingMember ? 'Edit Team Member' : 'Add Team Member'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Full Name</Form.ControlLabel>
              <Input 
                value={formData.name} 
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                placeholder="Enter full name"
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Role</Form.ControlLabel>
              <Input 
                value={formData.role} 
                onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                placeholder="e.g., Developer, Team Lead, Designer"
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>GitHub Username</Form.ControlLabel>
              <Input 
                value={formData.github} 
                onChange={(value) => setFormData(prev => ({ ...prev, github: value }))}
                placeholder="github_username"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="ghost" onClick={() => setShowModal(false)} disabled={loading}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={handleSaveMember} disabled={loading}>
            {loading ? <Loader size="xs" /> : (editingMember ? 'Update' : 'Add')} Member
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
}

export default withAuthentication(Teams);
