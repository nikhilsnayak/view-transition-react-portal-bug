import { ViewTransition } from 'react';
import { startTransition, Suspense, use, useState } from 'react';
import { createPortal } from 'react-dom';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ViewTransition>
      <div className='app-container'>
        <button
          className='open-button'
          onClick={() => {
            startTransition(() => {
              setIsOpen(true);
            });
          }}
        >
          Click me
        </button>
        <Dialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </ViewTransition>
  );
}

function Dialog({ isOpen, setIsOpen }) {
  return (
    isOpen &&
    createPortal(
      <div className='overlay'>
        <div className='dialog'>
          <Suspense
            fallback={
              <div className='skeleton-container'>
                <div className='skeleton'></div>
                <div className='skeleton'></div>
                <div className='skeleton'></div>
                <div className='skeleton'></div>
              </div>
            }
          >
            <DialogContent />
          </Suspense>
          <button
            className='close-button'
            onClick={() => {
              startTransition(() => {
                setIsOpen(false);
              });
            }}
          >
            Close
          </button>
        </div>
      </div>,
      document.body
    )
  );
}

const data = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com',
  phone: '1234567890',
  address: '123 Main St, Anytown, USA',
};

let promise = null;

const getPromise = () => {
  if (promise) {
    return promise;
  }

  promise = new Promise((resolve) => setTimeout(() => resolve(data), 1000));

  return promise;
};

function DialogContent() {
  const resolved = use(getPromise());

  return (
    <div className='dialog-content'>
      <p className='dialog-title'>{resolved.name}</p>
      <p>{resolved.age}</p>
      <p>{resolved.email}</p>
      <p>{resolved.phone}</p>
      <p>{resolved.address}</p>
    </div>
  );
}
