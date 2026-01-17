import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResumeCard from "../components/ResumeCard";
import api from "../services/api";

export default function HomePage() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const response = await api.get('/resumes/');
        setResumes(response.data);
      } catch (error) {
        console.error("Failed to fetch resumes", error);
      } finally {
        setLoading(false);
      }
    };
    loadResumes();
  }, []);

  return (
    <main className="bg-[url('/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loading && resumes.length === 0 ? (
            <h2>No resumes found. Upload your first to get started.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>

        {loading && <img src="/resume-scan.gif" className="w-48" alt="Loading..." />}
        
        {!loading && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loading && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit! text-xl font-semibold">
              Upload Your First Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}