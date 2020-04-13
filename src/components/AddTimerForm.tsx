import React, { useState } from 'react';

export type TimerFormData = {
  seconds: number;
  autoRepeat: boolean;
  note?: string;
}

type AddTimerFormProp = {
  onSubmit: (data: TimerFormData) => void;
};

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
        <input
          name="seconds"
          type="text"
          pattern="\d+"
          placeholder="Enter seconds – e.g. 30"
          value={seconds}
          required={true}
          onChange={(e) => setSeconds(e.target.value)}
        />
      </p>
      <p>
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
      </p>
      <p>
        <button type="submit">Add</button>
      </p>
    </form>
  );
};

export default AddTimerForm;
