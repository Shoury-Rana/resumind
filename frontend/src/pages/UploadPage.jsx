import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FileUploader from '../components/FileUploader';
import api from '../services/api';

const UploadPage = () => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a resume file to upload.');
            return;
        }

        setIsProcessing(true);
        const formData = new FormData(e.currentTarget);
        formData.append('resume_file', file);
        
        try {
            const response = await api.post('/resumes/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate(`/resume/${response.data.id}`);
        } catch (error) {
            console.error('Failed to analyze resume', error);
            alert('An error occurred during analysis. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <main className="bg-[url('/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16 max-w-4xl">
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>Analyzing your resume... This may take a moment.</h2>
                            <img src="/resume-scan.gif" className="w-full" alt="Processing..." />
                        </>
                    ) : (
                        <>
                            <h2>Drop your resume for an ATS score and improvement tips</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 w-full">
                                <div className="form-div">
                                    <label htmlFor="company_name">Company Name (Optional)</label>
                                    <input type="text" name="company_name" placeholder="e.g., Google" id="company_name" />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job_title">Job Title (Optional)</label>
                                    <input type="text" name="job_title" placeholder="e.g., Frontend Developer" id="job_title" />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job_description">Job Description (Optional)</label>
                                    <textarea rows={5} name="job_description" placeholder="Paste the job description here..." id="job_description" />
                                </div>
                                <div className="form-div">
                                    <label>Upload Resume (PDF)</label>
                                    <FileUploader onFileSelect={setFile} selectedFile={file} />
                                </div>
                                <button className="primary-button text-lg!" type="submit">
                                    Analyze Resume
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
};
export default UploadPage;