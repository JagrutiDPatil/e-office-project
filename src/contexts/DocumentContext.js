import React, { createContext, useState, useContext } from 'react';

const DocumentContext = createContext();

export function useDocumentContext() {
  return useContext(DocumentContext);
}

export function DocumentProvider({ children }) {
  const [documents, setDocuments] = useState([]);
  
  const addDocument = (newDoc) => {
    // Add timestamp and ID
    const documentWithMeta = {
      ...newDoc,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      author: 'You' // In a real app, use current user's name
    };
    
    setDocuments(prev => [documentWithMeta, ...prev]);
  };

  const value = {
    documents,
    addDocument
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}