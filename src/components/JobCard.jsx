import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onRefresh }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://job-portal-app-production-b1f6.up.railway.app/api/v1/job/delete-job/${job.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onRefresh();
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error:", error);
      alert("Failed to delete job");
    }
  };

  const handleEdit = () => {
    console.log("🚀 ~ handleEdit ~ job:", job);
    navigate(`/edit-job/${job.id}`);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{job.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {job.description}
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginTop: "10px", marginRight: "10px" }}>
          Delete
        </Button>
        <Button variant="outlined" color="primary" onClick={handleEdit} style={{ marginTop: "10px" }}>
          Edit
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
