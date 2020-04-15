import React, { useState } from 'react';
import styled from 'styled-components';

export type TimerFormData = {
  seconds: number;
  autoRepeat: boolean;
  note?: string;
}

type AddTimerFormProp = {
  onSubmit: (data: TimerFormData) => void;
};

const SubmitButton = styled.button`
  margin-left: 1rem;
`;

const CountdownInput = styled.input`
  && {
    min-width: auto;
    width: 5.5rem;
    margin-right: 0.5rem;
  }
`;

const AddTimerForm = (props: AddTimerFormProp) => {
  const [seconds, setSeconds] = useState<string>('');
  const [autoRepeat, setAutoRepeat] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.onSubmit({
      seconds: Number(seconds),
      autoRepeat,
      note,
    });
    setSeconds('');
    setAutoRepeat(false);
    setNote('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <CountdownInput
          tabIndex={0}
          name="seconds"
          type="text"
          pattern="\d+"
          placeholder="Countdown"
          value={seconds}
          required={true}
          onChange={(e: any) => setSeconds(e.target.value)}
        />
        <input type="text"
          onChange={(e: any) => setNote(e.target.value)} value={note}
          placeholder="Reminder note"
        />
      </p>
      <p>
        <label>
          <input
            type="checkbox"
            name="autoRepeat"
            pattern="\d+"
            checked={autoRepeat}
            onChange={(e: any) => {
              setAutoRepeat(e.target.checked);
            }}
          /> Auto repeat?
        </label>
        <SubmitButton type="submit">Add</SubmitButton>
      </p>
    </form>
  );
};

export default AddTimerForm;
