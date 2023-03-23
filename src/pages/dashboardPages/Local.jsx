import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createUser, fetchNotes, updateNote } from "../../features/userSlice";

const Local = () => {
  const { notes, isLoading } = useSelector((store) => store.user);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!input) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    if (!notes) {
      dispatch(createUser(input));
      return;
    }

    dispatch(updateNote(input));
    setInput("");
  };

  return (
    <Wrapper>
      <div className="section-center">
        <div className="form-header">
          <h3>add new note</h3>
          <p>(only you can view this note)</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="text">Contents: </label>
          <input
            type="text"
            id="text"
            placeholder="e.g. Environmental Assignment"
            className={error ? "error" : null}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button type="submit" className="btn">
            submit
          </button>
        </form>
        <div className="line"></div>
        <div className="notes">
          {isLoading ? (
            <div className="loading"></div>
          ) : notes && notes.length ? (
            notes.map(({ text }, index) => {
              return (
                <article key={index} className="note">
                  <p className="note-id">{index + 1}</p>
                  <p className="note-text">{text}</p>
                </article>
              );
            })
          ) : (
            <h5 className="no-notes">You have no notes to display!</h5>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
export default Local;

const Wrapper = styled.section`
  .section-center {
    background: var(--primary-1);
    margin-top: 1rem;
  }

  .form {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;

    label {
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    input {
      border-radius: var(--radius);
      height: 10rem;
      z-index: 1;
      padding: 0 1rem;
    }

    .error::placeholder {
      color: red;
    }

    button {
      grid-area: 2/1/3/3;
      width: 10rem;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 1rem;
    padding-bottom: 0;

    h3 {
      margin-top: 1.5rem;
    }

    p {
      color: var(--primary-4);
    }
  }

  .line {
    height: 0.75rem;
    width: 100%;
    background: var(--white);
  }

  .notes {
    padding: 1rem;
  }

  .note {
    padding: 1rem;
    margin: 1rem;
    display: flex;
    gap: 1rem;
    border: 2px solid var(--primary-5);
    border-radius: var(--radius);
    position: relative;
    padding-left: 2rem;
    margin-bottom: 3rem;

    .note-id {
      position: absolute;
      display: block;
      background: var(--white);
      padding: 0.25rem;
      width: 1rem;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--primary-5);
      border-radius: 50%;
      left: 0;
      transform: translateX(-50%);
    }
  }

  .no-notes {
    margin-top: 1rem;
  }
`;
