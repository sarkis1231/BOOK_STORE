import React from 'react';
import Input from "../../components/Reusable/Input";
import {FlexContainer} from "../../styled/layout.styled";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import Button from "../../components/Reusable/Button";
import {useTranslation} from "react-i18next";

const FilterForm = ({searchHandleSubmit, onSearchSubmit, searchRegister, searchErrors}) => {
    const {t} = useTranslation();
    return (
        <>
            <form onSubmit={searchHandleSubmit(onSearchSubmit)}>
                <Input ref={searchRegister} label={t('books.bookName')} placeHolder={t('books.bookName')} error={searchErrors}
                       name='name'
                       onInputChange={e => e.target.value.trim()}/>
                <Input ref={searchRegister} label={t('books.bookPageCount')} placeHolder={t('books.count')} margin='20px 0'
                       error={searchErrors}
                       name='pageCount'
                       onInputChange={e => e.target.value.trim()}/>

                <Input ref={searchRegister} label={t('books.publishedDate')} name='publishedDate' placeHolder='YYYY-MM-DD'
                       error={searchErrors}
                       onInputChange={e => e.target.value.trim()}
                />
                <FlexContainer justifyContent='space-between' margin='20px 0'>
                    <ControlledDropDown ref={searchRegister} name='genre' url={'/genre'}
                                        defaultValue={{name: 'none', value: ''}}
                                        label={t('headerItem.item4')}
                                        width='49%'
                                        error={searchErrors}
                    />
                    <ControlledDropDown ref={searchRegister} name='author' url={'/authors'}
                                        defaultValue={{name: 'none', value: ''}}
                                        label={t('headerItem.item5')}
                                        width='49%'
                                        error={searchErrors}
                    />
                </FlexContainer>
                <Button type='submit' margin='20px 0'>{t('books.searchBooks')}</Button>
            </form>
        </>
    );
};

export default FilterForm;