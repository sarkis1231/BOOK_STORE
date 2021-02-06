import React from 'react';
import Input from "../../components/Reusable/Input";
import {FlexContainer} from "../../styled/layout.styled";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import Button from "../../components/Reusable/Button";

const FilterForm = ({searchHandleSubmit, onSearchSubmit, searchRegister, searchErrors}) => {
    return (
        <>
            <form onSubmit={searchHandleSubmit(onSearchSubmit)}>
                <Input ref={searchRegister} label='Book name' placeHolder='Book Name' error={searchErrors}
                       name='name'
                       onInputChange={e => e.target.value.trim()}/>
                <Input ref={searchRegister} label='Book page count' placeHolder='count' margin='20px 0'
                       error={searchErrors}
                       name='pageCount'
                       onInputChange={e => e.target.value.trim()}/>

                <Input ref={searchRegister} label='Published Date' name='publishedDate' placeHolder='YYYY-MM-DD'
                       error={searchErrors}
                       onInputChange={e => e.target.value.trim()}
                />
                <FlexContainer justifyContent='space-between' margin='20px 0'>
                    <ControlledDropDown ref={searchRegister} name='genre' url={'/genre'}
                                        defaultValue={{name: 'none', value: ''}}
                                        label='Genre'
                                        width='49%'
                                        error={searchErrors}
                    />
                    <ControlledDropDown ref={searchRegister} name='author' url={'/authors'}
                                        defaultValue={{name: 'none', value: ''}}
                                        label='Authors'
                                        width='49%'
                                        error={searchErrors}
                    />
                </FlexContainer>
                <Button type='submit' margin='20px 0'>Search Books</Button>
            </form>
        </>
    );
};

export default FilterForm;