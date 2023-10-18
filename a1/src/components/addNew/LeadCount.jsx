import React from 'react'

const LeadCount = ({ setLeads }) => {
  return (
    <div>
      <label htmlFor="i1">Lead Count : </label>
      <input
        id="i1"
        placeholder="00"
        onChange={(newValue) => setLeads(newValue)}
      />
    </div>
  );
};

export default LeadCount