import React from 'react';
import Input from "../../components/Reusable/Input";
import {FlexContainer} from "../../styled/layout.styled";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import Button from "../../components/Reusable/Button";

const BooksFrom = ({
                       handleSubmit,
                       onSubmit,
                       errors,
                       register,
                       values,
                       buttonName,
                       handleAddBookFile,
                       handleAddImageFile,
                       addImageFile,
                       addBookFilePlaceHolder
                   }) => {

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input ref={register} label='Book name' placeHolder='Book Name' error={errors} name='name'
                   value={values ? values['bookName'] : null}/>
            <Input ref={register} label='Book page count' placeHolder='count' margin='20px 0' error={errors}
                   name='pageCount'
                   value={values ? values['pageCount'] : null}
            />
            <Input ref={register} label='Published Date (optional)' name='publishedDate' placeHolder='YYYY-MM-DD'
                   error={errors} value={values ? values['publishedDate'] : null}
            />
            <FlexContainer justifyContent='space-between' margin='20px 0'>
                <ControlledDropDown ref={register} name='genre' url={'/genre'}
                                    defaultValue={values ? {
                                        name: values.genre.name,
                                        value: values.genre._id
                                    } : {name: 'none', value: ''}}
                                    label='Genre'
                                    width='49%'
                                    error={errors}
                />
                <ControlledDropDown ref={register} name='author' url={'/authors'}
                                    defaultValue={values ? {
                                        name: values.author.name,
                                        value: values.author._id
                                    } : {name: 'none', value: ''}}
                                    label='Authors'
                                    width='49%'
                                    error={errors}
                />
            </FlexContainer>
            <Input name='file' onFileChange={handleAddBookFile} ref={register} type='file' label='Choose a Book'
                   placeHolder={addBookFilePlaceHolder}
                   error={errors}/>
            <Input onFileChange={handleAddImageFile} name='image' ref={register} type='file' label='Choose an Image'
                   placeHolder={addImageFile}
                   error={errors} margin='20px 0 0'/>
            <Button type='submit' margin='20px 0'>{buttonName}</Button>
        </form>
    );
};

export default BooksFrom;