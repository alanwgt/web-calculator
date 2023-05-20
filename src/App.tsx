import './styles/reset.css';
import './styles/global.css';

import { StoreContext, StoreProvider } from './providers/Store.provider';
import Page from './components/layout/Page/Page';
import History from './components/History/History';
import Calculator from './components/Calculator/Calculator';
import CompoundInterest from './components/CompoundInterest/CompoundInterest';

const App = () => (
    <StoreProvider>
        <StoreContext.Consumer>
            {({ mode }) => (
                <Page>
                    <History />
                    {mode === 'normal' ? <Calculator /> : <CompoundInterest />}
                </Page>
            )}
        </StoreContext.Consumer>
    </StoreProvider>
);

export default App;
