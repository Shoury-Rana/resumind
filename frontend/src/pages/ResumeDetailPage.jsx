import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import Summary from "../components/Summary";
import ATS from "../components/ATS";
import Details from "../components/Details";

const BACKEND_URL = "http://localhost:8000";

const ResumeDetailPage = () => {
    const { id } = useParams();
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/resumes/${id}/`);
                setAnalysis(response.data);
            } catch (err) {
                setError("Failed to load resume analysis. It might have been deleted or an error occurred.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAnalysis();
        }
    }, [id]);

    const imageUrl = analysis && analysis.preview_image 
        ? analysis.preview_image.startsWith('http') 
            ? analysis.preview_image 
            : `${BACKEND_URL}${analysis.preview_image.startsWith('/') ? '' : '/'}${analysis.preview_image}`
        : '';
    const resumeUrl = analysis && analysis.resume_file
        ? analysis.resume_file.startsWith('http')
            ? analysis.resume_file
            : `${BACKEND_URL}${analysis.resume_file.startsWith('/') ? '' : '/'}${analysis.resume_file}`
        : '';

    return (
        <main className="pt-0!">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/back.svg" alt="back" className="w-4 h-4" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/bg-small.svg')] bg-cover lg:h-screen lg:sticky top-0 flex items-center justify-center">
                    {loading && <div className="text-center text-gray-500">Loading Preview...</div>}
                    {error && <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">Could not load preview.</div>}
                    {analysis && imageUrl && (
                        <div className="gradient-border h-[90%] w-full max-w-xl animate-fade-in">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" title="Click to open full PDF">
                                <img
                                    src={imageUrl}
                                    className="w-full h-full object-contain rounded-2xl"
                                    alt="Resume preview"
                                    onError={(e) => {
                                        console.error('Failed to load preview image:', imageUrl);
                                        e.target.src = '/placeholder.png';
                                    }}
                                />
                            </a>
                        </div>
                    )}
                </section>
                
                {/* Right Section: Feedback Details */}
                <section className="feedback-section">
                    <h1 className="text-4xl! text-gradient bg-none! text-black! font-bold">Resume Review</h1>
                    
                    {loading && <img src="/resume-scan-2.gif" className="w-full" alt="Analyzing..." />}
                    
                    {error && <p className="text-red-500 text-center p-4 bg-red-50 rounded-lg">{error}</p>}
                    
                    {analysis && analysis.feedback && (
                        <div className="flex flex-col gap-8 animate-fade-in">
                            <Summary feedback={analysis.feedback} />
                            <ATS score={analysis.feedback.ATS?.score || 0} tips={analysis.feedback.ATS?.tips || []} />
                            <Details feedback={analysis.feedback} />
                        </div>
                    )}
                    
                    {analysis && !analysis.feedback && !loading && (
                        <div className="text-center p-8 bg-yellow-50 rounded-lg border border-yellow-200">
                            <h2 className="text-2xl font-semibold mb-4 text-yellow-800">Analysis Incomplete</h2>
                            <p className="text-yellow-700">The AI analysis for this resume could not be completed due to an error. You may want to delete it and try uploading again.</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default ResumeDetailPage;