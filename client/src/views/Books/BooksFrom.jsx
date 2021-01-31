import React from 'react';
import Input from "../../components/Reusable/Input";
import {FlexContainer} from "../../styled/layout.styled";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import Button from "../../components/Reusable/Button";

const BooksFrom = ({handleSubmit, onSubmit, errors, register}) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input ref={register} label='Book name' placeHolder='Book Name' error={errors} name='name'/>
            <Input ref={register} label='Book page count' placeHolder='count' margin='20px 0' error={errors}
                   name='pageCount'/>
            <Input ref={register} label='Published Date (optional)' name='publishedDate' placeHolder='YYYY-MM-DD'
                   error={errors}/>
            <FlexContainer justifyContent='space-between' margin='20px 0'>
                <ControlledDropDown ref={register} name='genre' url={'/genre'}
                                    defaultValue={{name: 'none', value: ''}}
                                    label='Genre'
                                    width='49%'
                                    error={errors}
                />
                <ControlledDropDown ref={register} name='author' url={'/authors'}
                                    defaultValue={{name: 'none', value: ''}}
                                    label='Authors'
                                    width='49%'
                                    error={errors}
                />
            </FlexContainer>
            <Input name='file' ref={register} type='file' label='Choose a Book' placeHolder={'Choose a Book'}
                   error={errors}/>
            <Input name='image' ref={register} type='file' label='Choose an Image' placeHolder={'Choose an Image'}
                   error={errors} margin='20px 0 0'/>
            <Button type='submit' margin='20px 0'>Add Books</Button>
        </form>
    );
};

export default BooksFrom;