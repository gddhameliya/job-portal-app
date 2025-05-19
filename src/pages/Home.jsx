import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://job-portal-app-production-b1f6.up.railway.app/api/v1/job/fetch-job", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setJobs(res?.data?.payload);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>
      <Button variant="contained" onClick={() => navigate("/create-job")}>
        Post New Job
      </Button>
      <Grid container spacing={2} marginTop={2}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <JobCard job={job} onRefresh={fetchJobs} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
