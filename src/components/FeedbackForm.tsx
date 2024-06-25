import { useState } from "react"
import { MAX_CHARACTERS } from "../lib/constants";
type feedbackFormProps = {
    onAddToList: (text: string) => void
}

export default function FeedbackForm({ onAddToList }: feedbackFormProps) {

    const [text, setText] = useState("")
    const charCount = MAX_CHARACTERS - text.length;
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        if (newText.length <= MAX_CHARACTERS) {
            setText(newText);
        }

    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddToList(text);
        setText("");
    }

    return (
        <form onSubmit={handleSubmit} className='form'>
            <textarea maxLength={MAX_CHARACTERS}
                value={text}
                id='feedback-textarea'
                placeholder='asdf'
                spellCheck={false}
                onChange={handleChange}
            />
            <label htmlFor='feedback-textarea'>
                Enter your feedback here. Remember to use hashtag for categorizaiton.
            </label>
            <div>
                <p className='u-italic'>{charCount}</p>
                <button type='submit'><span>Submit</span> </button>
            </div>

        </form>
    )
}
