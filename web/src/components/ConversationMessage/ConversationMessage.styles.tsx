import styled from 'styled-components';

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30px;
  text-transform: capitalize;

  border-radius: 50%;
  border: 2px solid white;

  margin-right: 1rem;

  min-width: 40px;
  max-width: 40px;
  
  min-height: 40px;
  max-height: 40px;

  overflow: hidden;
`;

export const MessageDetails = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;
`;

export const UsernameAndDateContainer = styled.div`
  display: flex;
  flex-direction: row;

  flex-grow: 1;
`;

export const Username = styled.div`
  font-weight: bold;
  margin-right: 0.5rem;
`;

export const Text = styled.div`
  display: flex;
  flex-grow: 1;
  white-space: pre-wrap;
`;

export const ConsecutiveMessageDate = styled.div`
  opacity: 0;

  width: 50px;
  min-width: 50px;
  margin-right: 0.5rem;
  font-size: 0.75rem;

  transition: opacity 0.25s;
`;

export const ConsecutiveMessage = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  margin-bottom: 0.25rem;
`;

export const Date = styled.div``;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding: 0.25rem 0.5rem;
  margin-right: 0.25rem;
  border-radius: 0.25rem;

  transition: background-color 0.25s;

  :hover {
    background-color: #26262b;
  }

  :hover ${ConsecutiveMessageDate} {
    opacity: 1;
  }
`;