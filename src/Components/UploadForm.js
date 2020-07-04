import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { beginAddPhoto } from '../actions/photos';

const UploadForm = ({ errors, dispatch }) => {
  const [photo, setPhoto] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErroMsg] = useState(null);
  const imageIds = [];
  useEffect(() => {
    setErroMsg(errors);
  }, [errors]);

  useEffect(() => {
    setErroMsg(''); // сбрасывается сообщение об ошибке при загрузке страницы
  }, []);

  const handleOnChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (photo) {
      setErroMsg('');
      dispatch(beginAddPhoto(photo));
      imageIds.push(photo.id);
      setIsSubmitted(true);
    }
  };

  return (
    <React.Fragment>
      {errorMsg && errorMsg.upload_error ? (
        <p className="errorMsg centered-message">{errorMsg.upload_error}</p>
      ) : (
        isSubmitted && (
          <p className="successMsg centered-message">
            Photo uploaded successfully.
          </p>
        )
      )}
      <Form
        onSubmit={handleFormSubmit}
        method="post"
        encType="multipart/form-data"
        className="upload-form"
      >
        <Form.Group>
          {/*<Form.Label>Choose photo to upload</Form.Label>*/}
          <Form.Control type="file" name="photo" onChange={handleOnChange} />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className={`${!photo ? 'disabled submit-btn' : 'submit-btn'}`}
          disabled={!photo}
        >
          Upload
        </Button>
      </Form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  photos: state.photos || [],
  errors: state.errors || {}
});

export default connect(mapStateToProps)(UploadForm);
