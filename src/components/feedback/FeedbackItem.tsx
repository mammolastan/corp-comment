import { useState } from "react";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItem } from "../../lib/types";

type FeedbackItemProps = { feedbackItem: TFeedbackItem }

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {

    const { upvoteCount, badgeLetter, company, text, daysAgo } = feedbackItem;
    const [open, setOpen] = useState<boolean>(false);
    const [upvoteCountState, setUpvoteCountState] = useState<number>(upvoteCount);

    const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setUpvoteCountState(prev => ++prev);
        e.currentTarget.disabled = true;
        e.stopPropagation();
    }

    return (
        <li onClick={() => setOpen(prev => !prev)} className={`feedback ${open ? 'feedback--expand' : ''}`}>
            <button onClick={handleUpvote}>
                <TriangleUpIcon />
                <span>{upvoteCountState}</span>
            </button>
            <div>
                <p>{badgeLetter}</p>
            </div>
            <div><p>{company}</p>
                <p>
                    {text}
                </p>
            </div>
            <p>{daysAgo === 0 ? "NEW" : `${daysAgo}d`}</p>
        </li>
    )
}
