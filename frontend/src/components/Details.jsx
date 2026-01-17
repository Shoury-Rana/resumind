import { cn } from "../lib/utils";
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from "./Accordion";

const ScoreBadge = ({ score }) => {
    const scoreColor = score > 69 ? 'green' : score > 39 ? 'yellow' : 'red';
    const bgColor = `bg-[var(--color-badge-${scoreColor})]`;
    const textColor = `text-[var(--color-badge-${scoreColor}-text)]`;

    return (
        <div className={cn("flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]", bgColor)}>
            <img src={score > 69 ? "/check.svg" : "/warning.svg"} alt="score icon" className="size-4" />
            <p className={cn("text-sm font-medium", textColor)}>{score}/100</p>
        </div>
    );
};

const CategoryHeader = ({ title, categoryScore }) => (
    <div className="flex flex-row gap-4 items-center py-2">
        <p className="text-2xl font-semibold">{title}</p>
        <ScoreBadge score={categoryScore} />
    </div>
);

const CategoryContent = ({ tips }) => (
    <div className="flex flex-col gap-4 items-center w-full">
        <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
                <div className="flex flex-row gap-2 items-start" key={index}>
                    <img src={tip.type === "good" ? "/check.svg" : "/warning.svg"} alt="tip icon" className="size-5 mt-1 shrink-0" />
                    <p className="text-lg text-gray-600 ">{tip.tip}</p>
                </div>
            ))}
        </div>
        <div className="flex flex-col gap-4 w-full">
            {tips.map((tip, index) => (
                <div
                    key={index + tip.tip}
                    className={cn(
                        "flex flex-col gap-2 rounded-2xl p-4",
                        tip.type === "good"
                            ? "bg-green-50 border border-green-200 text-green-800"
                            : "bg-yellow-50 border border-yellow-200 text-yellow-800"
                    )}
                >
                    <div className="flex flex-row gap-2 items-center">
                        <img src={tip.type === "good" ? "/check.svg" : "/warning.svg"} alt="score" className="size-5" />
                        <p className="text-xl font-semibold">{tip.tip}</p>
                    </div>
                    <p>{tip.explanation}</p>
                </div>
            ))}
        </div>
    </div>
);

const Details = ({ feedback }) => {
    if (!feedback) return null;
    return (
        <div className="flex flex-col gap-4 w-full">
            <h2 className="text-3xl text-black! font-bold">Detailed Breakdown</h2>
            <Accordion>
                <AccordionItem id="tone-style">
                    <AccordionHeader itemId="tone-style">
                        <CategoryHeader title="Tone & Style" categoryScore={feedback.toneAndStyle.score} />
                    </AccordionHeader>
                    <AccordionContent itemId="tone-style">
                        <CategoryContent tips={feedback.toneAndStyle.tips} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem id="content">
                    <AccordionHeader itemId="content">
                        <CategoryHeader title="Content" categoryScore={feedback.content.score} />
                    </AccordionHeader>
                    <AccordionContent itemId="content">
                        <CategoryContent tips={feedback.content.tips} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem id="structure">
                    <AccordionHeader itemId="structure">
                        <CategoryHeader title="Structure" categoryScore={feedback.structure.score} />
                    </AccordionHeader>
                    <AccordionContent itemId="structure">
                        <CategoryContent tips={feedback.structure.tips} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem id="skills">
                    <AccordionHeader itemId="skills">
                        <CategoryHeader title="Skills" categoryScore={feedback.skills.score} />
                    </AccordionHeader>
                    <AccordionContent itemId="skills">
                        <CategoryContent tips={feedback.skills.tips} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Details;