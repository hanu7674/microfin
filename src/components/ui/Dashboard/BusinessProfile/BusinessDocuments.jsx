import React, { useState, useRef, useEffect } from 'react';
import {
  IconButton,
  Button,
  Tag,
  Stack,
  Modal,
  Form,
  Schema,
  Message,
  SelectPicker,
  Uploader,
  Progress,
  Loader
} from 'rsuite';
import { FaUpload, FaFilePdf, FaFile, FaDownload } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useSelector, useDispatch } from 'react-redux';
import { uploadBusinessDocument } from '../../../../redux/businessProfile';
import { useBusinessProfile } from '../../../../hooks/useDataService';

const { StringType } = Schema.Types;

const documentTypes = [
  { label: 'Business Registration Certificate', value: 'registration' },
  { label: 'GST Registration Certificate', value: 'gst' },
  { label: 'Business License', value: 'license' },
  { label: 'Other', value: 'other' }
];

const model = Schema.Model({
  name: StringType().isRequired('Document name is required'),
  type: StringType().isRequired('Document type is required'),
  fileList: Schema.Types.ArrayType().isRequired('Please select a file')
});

const UploadDocumentModal = ({ open, onClose, onUpload, uploading, uploadError, uploadProgress, cardBg }) => {
  const [formValue, setFormValue] = useState({ name: '', type: '', fileList: [] });
  const [formError, setFormError] = useState({});
  const formRef = useRef();

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      setFormError(formRef.current.formError);
      return;
    }
    const fileItem = formValue.fileList?.[0];
    const realFile = fileItem?.blobFile || fileItem;
    if (!realFile) {
      setFormError(prev => ({ ...prev, fileList: 'Please select a file' }));
      return;
    }
    onUpload({
      name: formValue.name,
      type: formValue.type,
      file: realFile
    });
  };

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <Modal.Header>
        <Modal.Title>Upload Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {uploadError && <Message type="error" style={{ marginBottom: 12 }}>{uploadError}</Message>}
        <Form
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          formError={formError}
          fluid
        >
          <Form.Group>
            <Form.ControlLabel>Document Name *</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Document Type *</Form.ControlLabel>
            <Form.Control
              name="type"
              accepter={SelectPicker}
              data={documentTypes}
              block
              placeholder="Select type"
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>File *</Form.ControlLabel>
            <Uploader
              name="fileList"
              fileListVisible={false}
              // fileList={formValue.fileList}
              onChange={fileList => {
                setFormValue(prev => ({ ...prev, fileList }));
                setFormError(prev => ({ ...prev, fileList: fileList?.length ? undefined : 'Please select a file' }));
              }}
              autoUpload={false}
              draggable
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              action="#"
              // listType="text"
              style={{ width: '100%', backgroundColor: cardBg }}
            >
              <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 {formValue.fileList?.[0]?.name || 'Click or drag file to this area to upload'}
              </div>
            </Uploader>
            {uploading && (
          <Progress.Line percent={uploadProgress} showInfo style={{ marginBottom: 12 }} />
        )}

            
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Stack spacing={10} alignItems="flex-end" justifyContent="flex-end">
          <Button appearance="subtle" onClick={onClose} disabled={uploading}>Cancel</Button>
          <Button appearance="primary" onClick={handleSubmit} loading={uploading} disabled={uploading}>
          {uploading ? `Uploading... ${uploadProgress}%` : 'Upload Document'}
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
};

const getStatusTag = (status) => {
  const statusMap = {
    Verified: { color: 'green', bg: '#e6f4ea', text: '#1e7e34' },
    Pending: { color: 'orange', bg: '#fff3e0', text: '#f57c00' },
    Rejected: { color: 'red', bg: '#fdecea', text: '#c82333' }
  };
  const { color, bg, text } = statusMap[status] || statusMap.Rejected;
  return (
    <Tag color={color} style={{
      backgroundColor: bg,
      color: text,
      border: 'none',
      borderRadius: 12,
      padding: '4px 12px',
      fontSize: 12,
      fontWeight: 500
    }}>{status}</Tag>
  );
};

const getIcon = (type) => type === 'pdf' ? <FaFilePdf /> : <FaFile />;

const BusinessDocuments = () => {
  const { documents, documentsLoading, documentsError, fetchDocuments } = useBusinessProfile();
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  const { uploading, uploadProgress, uploadError } = useSelector(state => state.businessProfile);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleUpload = ({ name, type, file }) => {
     dispatch(uploadBusinessDocument(file, {type: type, name: name}));
  };
  useEffect(() => {
     fetchDocuments();
   }, [fetchDocuments]);
  useEffect(() => {
    if (!uploading && uploadProgress === 100 && !uploadError) {
      setShowModal(false);
    }
  }, [uploading, documents]);

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: '2%',
          boxShadow: shadow
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: cardText }}>
            Business Documents
          </h3>
          <Button
            appearance="primary"
            size="sm"
            onClick={() => setShowModal(true)}
            disabled={uploading}
          >
            <FaUpload style={{ marginRight: 6 }} />Upload Document
          </Button>
        </div>

        {documentsLoading ? (
          <div style={{ color: cardText, opacity: 0.7, fontSize: 14, padding: 16, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loader content="Loading documents..." />
          </div>
        ) : <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {documents?.length === 0 && (
            <div style={{ color: cardText, opacity: 0.7, fontSize: 14, padding: 16 }}>
              No documents uploaded yet.
            </div>
          )}
          {documents?.map((doc, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                border: `1px solid ${borderColor}`,
                borderRadius: 6
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 20, color: cardText, opacity: 0.7 }}>
                  {getIcon(doc.type)}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 4 }}>
                    {doc.name}
                  </div>
                  <div style={{ fontSize: 12, color: cardText, opacity: 0.7 }}>
                    Uploaded on {doc.uploadedAt?.toDate ? doc.uploadedAt.toDate().toLocaleString() : '...'}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {getStatusTag(doc.status)}
                {doc.downloadUrl && (
                  <IconButton
                    appearance="subtle"
                    size="xs"
                    circle
                    style={{ padding: '4px 8px', minWidth: 'auto', color: cardText, opacity: 0.7 }}
                    as="a"
                    href={doc.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDownload />
                  </IconButton>
                )}
              </div>
            </div>
          ))}
        </div>
        </>}
        {documentsError && (
          <div style={{ color: cardText, opacity: 0.7, fontSize: 14, padding: 16 }}>
            Error loading documents.
          </div>
        )}
        
      </div>
      <UploadDocumentModal
        cardBg={cardBg}
        open={showModal}
        onClose={() => setShowModal(false)}
        onUpload={handleUpload}
        uploading={uploading}
        uploadError={uploadError}
        uploadProgress={uploadProgress}
      />
    </div>
  );
};

export default BusinessDocuments;