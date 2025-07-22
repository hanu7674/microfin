import React from 'react';
import { Panel, Stack } from 'rsuite';

const ClientDebug = ({ clients, loading, error }) => {
  return (
    <Panel header="Debug Info" style={{ marginBottom: 20, backgroundColor: '#f5f5f5' }}>
      <Stack direction="column" spacing={10}>
        <div>
          <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Error:</strong> {error || 'None'}
        </div>
        <div>
          <strong>Clients Count:</strong> {clients?.length || 0}
        </div>
        <div>
          <strong>Clients Data:</strong>
          <pre style={{ fontSize: '12px', maxHeight: '200px', overflow: 'auto' }}>
            {JSON.stringify(clients, null, 2)}
          </pre>
        </div>
      </Stack>
    </Panel>
  );
};

export default ClientDebug; 