// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   TextField,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Divider,
//   Chip,
//   Paper,
//   IconButton,
//   InputAdornment
// } from '@mui/material';
// import {
//   Description,
//   AttachFile,
//   ArrowForward,
//   ArrowBack,
//   Check,
//   Close,
//   Search
// } from '@mui/icons-material';
// //import { List, ListItem, ListItemText } from '@material-ui/core';
// import { List, ListItem, ListItemText } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// const steps = ['Document Details', 'Attachments', 'Review & Submit'];

// const documentTypes = [
//   'Memo',
//   'Report',
//   'Proposal',
//   'Policy',
//   'Financial',
//   'Contract',
//   'Other'
// ];

// const departments = [
//   'Administration',
//   'Finance',
//   'Human Resources',
//   'Operations',
//   'IT',
//   'Legal'
// ];

// export default function NewDocument() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [documentData, setDocumentData] = useState({
//     title: '',
//     description: '',
//     type: '',
//     department: '',
//     priority: 'normal',
//     confidentiality: 'internal',
//     referenceNumber: '',
//     dueDate: null,
//     attachments: []
//   });
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleNext = () => {
//     if (activeStep === 0) {
//       const newErrors = {};
//       if (!documentData.title) newErrors.title = 'Title is required';
//       if (!documentData.type) newErrors.type = 'Type is required';
//       if (!documentData.department) newErrors.department = 'Department is required';
      
//       if (Object.keys(newErrors).length > 0) {
//         setErrors(newErrors);
//         return;
//       }
//     }
    
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDocumentData({
//       ...documentData,
//       [name]: value
//     });
//     // Clear error when field is edited
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: null
//       });
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const handleUpload = () => {
//     if (!selectedFile) return;
    
//     const newAttachment = {
//       name: selectedFile.name,
//       size: (selectedFile.size / 1024).toFixed(2) + ' KB',
//       type: selectedFile.type.split('/')[1] || 'file',
//       uploadedAt: new Date().toISOString()
//     };

//     setDocumentData({
//       ...documentData,
//       attachments: [...documentData.attachments, newAttachment]
//     });
//     setSelectedFile(null);
//   };

//   const handleRemoveAttachment = (index) => {
//     const newAttachments = [...documentData.attachments];
//     newAttachments.splice(index, 1);
//     setDocumentData({ ...documentData, attachments: newAttachments });
//   };

//   const handleSubmit = () => {
//     // In a real app, you would call an API here
//     console.log('Submitting document:', documentData);
//     // Simulate API call
//     setTimeout(() => {
//       navigate('/documents');
//     }, 1000);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Create New Document
//       </Typography>
      
//       <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {activeStep === 0 && (
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Document Information
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Document Title"
//                   name="title"
//                   value={documentData.title}
//                   onChange={handleChange}
//                   error={!!errors.title}
//                   helperText={errors.title}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Description"
//                   name="description"
//                   value={documentData.description}
//                   onChange={handleChange}
//                   multiline
//                   rows={4}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth error={!!errors.type}>
//                   <InputLabel>Document Type *</InputLabel>
//                   <Select
//                     name="type"
//                     value={documentData.type}
//                     onChange={handleChange}
//                     label="Document Type *"
//                   >
//                     {documentTypes.map((type) => (
//                       <MenuItem key={type} value={type}>{type}</MenuItem>
//                     ))}
//                   </Select>
//                   {errors.type && <Typography color="error" variant="caption">{errors.type}</Typography>}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth error={!!errors.department}>
//                   <InputLabel>Department *</InputLabel>
//                   <Select
//                     name="department"
//                     value={documentData.department}
//                     onChange={handleChange}
//                     label="Department *"
//                   >
//                     {departments.map((dept) => (
//                       <MenuItem key={dept} value={dept}>{dept}</MenuItem>
//                     ))}
//                   </Select>
//                   {errors.department && <Typography color="error" variant="caption">{errors.department}</Typography>}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Priority</InputLabel>
//                   <Select
//                     name="priority"
//                     value={documentData.priority}
//                     onChange={handleChange}
//                     label="Priority"
//                   >
//                     <MenuItem value="low">Low</MenuItem>
//                     <MenuItem value="normal">Normal</MenuItem>
//                     <MenuItem value="high">High</MenuItem>
//                     <MenuItem value="urgent">Urgent</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Confidentiality</InputLabel>
//                   <Select
//                     name="confidentiality"
//                     value={documentData.confidentiality}
//                     onChange={handleChange}
//                     label="Confidentiality"
//                   >
//                     <MenuItem value="public">Public</MenuItem>
//                     <MenuItem value="internal">Internal</MenuItem>
//                     <MenuItem value="confidential">Confidential</MenuItem>
//                     <MenuItem value="secret">Secret</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Reference Number"
//                   name="referenceNumber"
//                   value={documentData.referenceNumber}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                   <DatePicker
//                     label="Due Date"
//                     value={documentData.dueDate}
//                     onChange={(date) => setDocumentData({...documentData, dueDate: date})}
//                     renderInput={(params) => <TextField fullWidth {...params} />}
//                   />
//                 </LocalizationProvider>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       )}

//       {activeStep === 1 && (
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Attachments
//             </Typography>
//             <Box sx={{ mb: 3 }}>
//               <input
//                 accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
//                 style={{ display: 'none' }}
//                 id="document-attachment"
//                 type="file"
//                 onChange={handleFileChange}
//               />
//               <label htmlFor="document-attachment">
//                 <Button
//                   variant="outlined"
//                   component="span"
//                   startIcon={<AttachFile />}
//                   sx={{ mr: 2 }}
//                 >
//                   Select File
//                 </Button>
//               </label>
//               {selectedFile && (
//                 <>
//                   <Typography variant="body1" component="span" sx={{ mr: 2 }}>
//                     {selectedFile.name}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     onClick={handleUpload}
//                     sx={{ mr: 1 }}
//                   >
//                     Upload
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     onClick={() => setSelectedFile(null)}
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               )}
//             </Box>

//             {documentData.attachments.length > 0 ? (
//               <Paper variant="outlined" sx={{ p: 2 }}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Attached Files
//                 </Typography>
//                 {documentData.attachments.map((file, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       mb: 1,
//                       p: 1,
//                       backgroundColor: 'action.hover',
//                       borderRadius: 1
//                     }}
//                   >
//                     <Box>
//                       <Typography>{file.name}</Typography>
//                       <Typography variant="caption">
//                         {file.size} • {file.type}
//                       </Typography>
//                     </Box>
//                     <IconButton
//                       size="small"
//                       onClick={() => handleRemoveAttachment(index)}
//                     >
//                       <Close fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 ))}
//               </Paper>
//             ) : (
//               <Typography variant="body2" color="text.secondary">
//                 No attachments added yet
//               </Typography>
//             )}
//           </CardContent>
//         </Card>
//       )}

//       {activeStep === 2 && (
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Review Document Details
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Document Information
//                 </Typography>
//                 <List dense>
//                   <ListItem>
//                     <ListItemText primary="Title" secondary={documentData.title} />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Description" secondary={documentData.description || 'None'} />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Type" secondary={documentData.type} />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Department" secondary={documentData.department} />
//                   </ListItem>
//                 </List>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Additional Details
//                 </Typography>
//                 <List dense>
//                   <ListItem>
//                     <ListItemText primary="Priority" secondary={documentData.priority} />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Confidentiality" secondary={documentData.confidentiality} />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Reference Number" secondary={documentData.referenceNumber || 'None'} />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText 
//                       primary="Due Date" 
//                       secondary={documentData.dueDate ? documentData.dueDate.toLocaleDateString() : 'None'} 
//                     />
//                   </ListItem>
//                 </List>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Attachments ({documentData.attachments.length})
//                 </Typography>
//                 {documentData.attachments.length > 0 ? (
//                   <List dense>
//                     {documentData.attachments.map((file, index) => (
//                       <ListItem key={index}>
//                         <ListItemText primary={file.name} secondary={`${file.size} • ${file.type}`} />
//                       </ListItem>
//                     ))}
//                   </List>
//                 ) : (
//                   <Typography variant="body2" color="text.secondary">
//                     No attachments
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       )}

//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
//         <Button
//           disabled={activeStep === 0}
//           onClick={handleBack}
//           startIcon={<ArrowBack />}
//         >
//           Back
//         </Button>
//         {activeStep === steps.length - 1 ? (
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             startIcon={<Check />}
//           >
//             Submit Document
//           </Button>
//         ) : (
//           <Button
//             variant="contained"
//             onClick={handleNext}
//             endIcon={<ArrowForward />}
//           >
//             Next
//           </Button>
//         )}
//       </Box>
//     </Box>
//   );
// }



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentContext } from '../contexts/DocumentContext'; // Added context
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  Paper,
  IconButton
} from '@mui/material';
import {
  Description,
  AttachFile,
  ArrowForward,
  ArrowBack,
  Check,
  Close
} from '@mui/icons-material';
import { List, ListItem, ListItemText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const steps = ['Document Details', 'Attachments', 'Review & Submit'];

const documentTypes = [
  'Memo',
  'Report',
  'Proposal',
  'Policy',
  'Financial',
  'Contract',
  'Other'
];

const departments = [
  'Administration',
  'Finance',
  'Human Resources',
  'Operations',
  'IT',
  'Legal'
];

export default function NewDocument() {
  const { addDocument } = useDocumentContext(); // Added document context
  const [activeStep, setActiveStep] = useState(0);
  const [documentData, setDocumentData] = useState({
    title: '',
    description: '',
    type: '',
    department: '',
    priority: 'normal',
    confidentiality: 'internal',
    referenceNumber: '',
    dueDate: null,
    attachments: []
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === 0) {
      const newErrors = {};
      if (!documentData.title) newErrors.title = 'Title is required';
      if (!documentData.type) newErrors.type = 'Type is required';
      if (!documentData.department) newErrors.department = 'Department is required';
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocumentData({
      ...documentData,
      [name]: value
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    const newAttachment = {
      name: selectedFile.name,
      size: (selectedFile.size / 1024).toFixed(2) + ' KB',
      type: selectedFile.type.split('/')[1] || 'file',
      uploadedAt: new Date().toISOString()
    };

    setDocumentData({
      ...documentData,
      attachments: [...documentData.attachments, newAttachment]
    });
    setSelectedFile(null);
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = [...documentData.attachments];
    newAttachments.splice(index, 1);
    setDocumentData({ ...documentData, attachments: newAttachments });
  };

  const handleSubmit = () => {
    // Create a complete document object
    const newDocument = {
      ...documentData,
      id: Date.now().toString(), // Generate unique ID
      createdAt: new Date().toISOString(), // Add creation timestamp
      status: 'pending', // Default status
      author: 'Current User', // Should be replaced with actual user
      // Convert dueDate to ISO string if exists
      dueDate: documentData.dueDate ? documentData.dueDate.toISOString() : null,
      // Keep attachments as is
      attachments: documentData.attachments
    };
    
    // Add to document context
    addDocument(newDocument);
    
    // Navigate to documents page
    navigate('/documents');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Document
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Document Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Document Title"
                  name="title"
                  value={documentData.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={documentData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.type}>
                  <InputLabel>Document Type *</InputLabel>
                  <Select
                    name="type"
                    value={documentData.type}
                    onChange={handleChange}
                    label="Document Type *"
                  >
                    {documentTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                  {errors.type && <Typography color="error" variant="caption">{errors.type}</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.department}>
                  <InputLabel>Department *</InputLabel>
                  <Select
                    name="department"
                    value={documentData.department}
                    onChange={handleChange}
                    label="Department *"
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                    ))}
                  </Select>
                  {errors.department && <Typography color="error" variant="caption">{errors.department}</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    name="priority"
                    value={documentData.priority}
                    onChange={handleChange}
                    label="Priority"
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Confidentiality</InputLabel>
                  <Select
                    name="confidentiality"
                    value={documentData.confidentiality}
                    onChange={handleChange}
                    label="Confidentiality"
                  >
                    <MenuItem value="public">Public</MenuItem>
                    <MenuItem value="internal">Internal</MenuItem>
                    <MenuItem value="confidential">Confidential</MenuItem>
                    <MenuItem value="secret">Secret</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reference Number"
                  name="referenceNumber"
                  value={documentData.referenceNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Due Date"
                    value={documentData.dueDate}
                    onChange={(date) => setDocumentData({...documentData, dueDate: date})}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {activeStep === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Attachments
            </Typography>
            <Box sx={{ mb: 3 }}>
              <input
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                style={{ display: 'none' }}
                id="document-attachment"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="document-attachment">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<AttachFile />}
                  sx={{ mr: 2 }}
                >
                  Select File
                </Button>
              </label>
              {selectedFile && (
                <>
                  <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                    {selectedFile.name}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleUpload}
                    sx={{ mr: 1 }}
                  >
                    Upload
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedFile(null)}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>

            {documentData.attachments.length > 0 ? (
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Attached Files
                </Typography>
                {documentData.attachments.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1,
                      p: 1,
                      backgroundColor: 'action.hover',
                      borderRadius: 1
                    }}
                  >
                    <Box>
                      <Typography>{file.name}</Typography>
                      <Typography variant="caption">
                        {file.size} • {file.type}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Paper>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No attachments added yet
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {activeStep === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Review Document Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Document Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Title" secondary={documentData.title} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Description" secondary={documentData.description || 'None'} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Type" secondary={documentData.type} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Department" secondary={documentData.department} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Additional Details
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Priority" secondary={documentData.priority} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Confidentiality" secondary={documentData.confidentiality} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Reference Number" secondary={documentData.referenceNumber || 'None'} />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Due Date" 
                      secondary={documentData.dueDate ? documentData.dueDate.toLocaleDateString() : 'None'} 
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Attachments ({documentData.attachments.length})
                </Typography>
                {documentData.attachments.length > 0 ? (
                  <List dense>
                    {documentData.attachments.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={file.name} secondary={`${file.size} • ${file.type}`} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No attachments
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<Check />}
          >
            Submit Document
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={<ArrowForward />}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}