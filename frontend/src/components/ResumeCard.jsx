import { Link } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";

const BACKEND_URL = "http://localhost:8000";

const ResumeCard = ({ resume }) => {
    const { id, company_name, job_title, overall_score, preview_image } = resume;

    return (
        <Link to={`/resume/${id}`} className="resume-card">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {company_name && <h2 className="text-black! font-bold wrap-break-word">{company_name}</h2>}
                    {job_title && <h3 className="text-lg wrap-break-word text-gray-500">{job_title}</h3>}
                    {!company_name && !job_title && <h2 className="text-black! font-bold">Resume Analysis</h2>}
                </div>
                <div className="shrink-0">
                    <ScoreCircle score={overall_score} />
                </div>
            </div>
            {preview_image && (
                <div className="gradient-border">
                    <div className="w-full h-full">
                        <img
                            src={preview_image.startsWith('http') ? preview_image : `${BACKEND_URL}${preview_image.startsWith('/') ? '' : '/'}${preview_image}`}
                            alt="resume preview"
                            className="w-full h-87.5 max-sm:h-50 object-cover object-top"
                        />
                    </div>
                </div>
            )}
        </Link>
    );
};
export default ResumeCard;