import React from 'react';
import { render } from '@testing-library/react';
import Timer from './Timer';

describe('Timer component', () => {

  it('should render properly', () => {
    const { getByText } = render(<Timer seconds={30} />);
    getByText('00:00:30');

    const { getByText: getByTextMinutes } = render(<Timer seconds={90} />);
    getByTextMinutes('00:01:30');

    const { getByText: getByTextHour } = render(<Timer seconds={60*60} autoRepeat={true} />);
    getByTextHour('01:00:00');
    getByTextHour('Repeat');

    const { getByText: getByTextNote } = render(<Timer seconds={30} note="Timer four" />);
    getByTextNote('Timer four');
  });
});
