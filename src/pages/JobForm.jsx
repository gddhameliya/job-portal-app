import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const JobForm = ({ editMode = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      const fetchJob = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `http://localhost:3004/api/v1/job/fetch-job-by-id/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTitle(response?.data?.payload?.title);
          setDescription(response?.data?.payload?.description);
        } catch (error) {
          console.log("🚀 ~ fetchJob ~ error:", error);
          alert("Failed to load job data");
        }
      };
      fetchJob();
    }
  }, [editMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3004/api/v1/job/update-job/${id}`,
          {
            title,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:3004/api/v1/job/create",
          {
            title,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      navigate("/");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      alert(editMode ? "Failed to update job" : "Failed to create job");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {editMode ? "Edit Job" : "Create Job"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          {editMode ? "Update" : "Submit"}
        </Button>
      </form>
    </Container>
  );
};

export default JobForm;
