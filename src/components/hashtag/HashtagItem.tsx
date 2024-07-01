type HashtagItemProps = {
    onSelectCompany: (company: string) => void
    company: string
}

export default function HashtagItem({ company, onSelectCompany }: HashtagItemProps) {
    return (
        <li key={company}>
            <button onClick={() => onSelectCompany(company)}>#{company}</button>
        </li>
    )
}
