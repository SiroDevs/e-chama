"use client";

import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Header } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageContainer from "@/components/actions/PageContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const initialFormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  id_number: "",
  kra_pin: "",
  country: "",
  address: "",
  sex: "",
  dob: null as Date | null,
  member_no: "",
  role: "member",
  joined_at: null as Date | null,
};

export default function CreateMemberPage() {
  const { isAuthenticated, member } = useAuthStore();
  const router = useRouter();
  
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name: string) => (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare data for API call
      const submitData = {
        ...formData,
        group_id: member!.group_id,
        dob: formData.dob ? formData.dob.toISOString() : null,
        joined_at: formData.joined_at ? formData.joined_at.toISOString() : null,
      };

      // Replace with your actual API call
      // const response = await createMember(submitData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push("/members");
      }, 1500);
      
    } catch (err: any) {
      setError(err.message || "Failed to create member");
      console.error("Error creating member:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setError(null);
    setSuccess(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Header />
        <Box
          sx={{
            mt: { xs: 4, sm: 0 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <PageContainer
            title="Add New Member"
            breadcrumbs={[
              { title: "Members" },
              { title: "Add New Member" },
            ]}
            actions={
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                disabled={loading}
              >
                Back to Members
              </Button>
            }
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Member created successfully! Redirecting...
            </Alert>
          )}

          <Paper sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Member Information
              </Typography>

              <Grid container spacing={3}>
                {/* Personal Information */}
                <Grid size={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.main' }}>
                    Personal Information
                  </Typography>
                </Grid>

                <Grid size={12} >
                  <TextField
                    fullWidth
                    label="First Name *"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </Grid>

                <Grid size={12} >
                  <TextField
                    fullWidth
                    label="Last Name *"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </Grid>

                <Grid size={12} >
                  <TextField
                    fullWidth
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </Grid>

                <Grid size={12} >
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>

                <Grid size={12} >
                  <TextField
                    fullWidth
                    label="ID Number"
                    name="id_number"
                    value={formData.id_number}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>

                <Grid size={12} >
                  <TextField
                    fullWidth
                    label="KRA PIN"
                    name="kra_pin"
                    value={formData.kra_pin}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>

                <Grid size={12} >
                  <FormControl fullWidth disabled={loading}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="sex"
                      value={formData.sex}
                      label="Gender"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value=""><em>Select Gender</em></MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={12} >
                  <DatePicker
                    label="Date of Birth"
                    value={formData.dob}
                    // onChange={handleDateChange("dob")}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        disabled: loading,
                      },
                    }}
                  />
                </Grid>

                {/* Address Information */}
                <Grid size={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.main', mt: 2 }}>
                    Address Information
                  </Typography>
                </Grid>

                <Grid size={12} >
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>

                {/* Membership Information */}
                <Grid size={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.main', mt: 2 }}>
                    Membership Information
                  </Typography>
                </Grid>

                <Grid size={12} >
                  <TextField
                    fullWidth
                    label="Member Number"
                    name="member_no"
                    value={formData.member_no}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>

                <Grid size={12} >
                  <FormControl fullWidth disabled={loading}>
                    <InputLabel>Role *</InputLabel>
                    <Select
                      name="role"
                      value={formData.role}
                      label="Role *"
                      onChange={handleSelectChange}
                      required
                    >
                      <MenuItem value="member">Member</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="treasurer">Treasurer</MenuItem>
                      <MenuItem value="secretary">Secretary</MenuItem>
                      <MenuItem value="chairperson">Chairperson</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={12} >
                  <DatePicker
                    label="Date Joined"
                    value={formData.joined_at}
                    // onChange={handleDateChange("joined_at")}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        disabled: loading,
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={loading}
                  size="large"
                >
                  {loading ? "Creating..." : "Create Member"}
                </Button>
                
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleReset}
                  disabled={loading}
                >
                  Reset Form
                </Button>
                
                <Button
                  type="button"
                  variant="text"
                  onClick={handleBack}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
        <Copyright sx={{ flex: 1, my: 4 }} />
      </Box>
    </LocalizationProvider>
  );
}