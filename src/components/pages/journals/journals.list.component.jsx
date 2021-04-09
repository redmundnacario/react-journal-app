import React, {useContext} from 'react'

import JournalContext from '../../../context/journal/journalContext'

import JournalCard from '../../layout/cards/journals/journal.card.component'

const JournalsList = () => {

    const journalContext = useContext(JournalContext)

    const { journals, getJournals } = journalContext

    return (
        <div className="journal-list">
            {
            journals.map((single_journal,index) => (
                // console.log(single_journal)
                // console.log(index)
                <JournalCard key ={index} journal={single_journal}/>
            ))
            }
        </div>
    )
}

export default JournalsList
