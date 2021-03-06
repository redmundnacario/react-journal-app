import React from 'react'

import JournalCard from '../../layout/cards/journals/journal.card.component'

const JournalsList = ({journals}) => {

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
