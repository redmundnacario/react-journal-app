import JournalsList from './journals.list.component'
import Button from '../../shared/button/button.component'

import './journals.page.styles.scss'

const JournalsPage = (props) => {
    const {journals , button_props} = props

    return (
        <div className="container">
            <div className="journal-page-title my-5">
                <h1 >🚀  Journals</h1>
                <Button {...button_props}/>
            </div>
            {
                journals.length > 0
                ? <JournalsList journals={journals}/>
                : <h2>No Journals yet. You can create one!</h2>
            }
            
        </div>
    )
}

export default JournalsPage
