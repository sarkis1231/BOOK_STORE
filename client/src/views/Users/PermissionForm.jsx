import React, {useState} from 'react';
import {FlexContainer} from "../../styled/layout.styled";
import {ReactComponent as AddIcon} from "../../assets/svg/Add.svg";
import {ReactComponent as DeleteIcon} from "../../assets/svg/delete.svg";
import Button from "../../components/Reusable/Button";
import styled from "styled-components";
import {PERMISSION_DROPDOWN_DATA} from "../../constant";
import PermissionDropDown from "../../components/Reusable/PermissionDropDown";
import {filterDataControlledDropDown} from "../../utils";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const PermissionForm = ({userId, closeModal}) => {
    const [fields, setFields] = useState([{permission: 0, genre: 0}]);
    const [check, setCheck] = useState(false);
    const [permission, setPermission] = useState({name: 'none', value: 0})
    const [genre, setGenre] = useState({name: 'none', value: 0})
    const [genreValue, setGenreValue] = useState({})
    const [permissionValue, setPermissionValue] = useState({})
    const getGenre = useFetch('/genre')

    let handleChangeCheck = (e) => {
        return setCheck(e.target.checked)

    };

    function handleAdd(i) {
        console.log(fields[i].permission + 1)
        setFields(prev => [...prev, {permission: prev[i].permission + 1, genre: prev[i].genre + 1}]);
        setPermission({name: 'none', value: 0})
        setGenre({name: 'none', value: 0})
    }

    function handleRemove(i, key, fieldPer) {
        const values = [...fields].filter(({ permission}) => permission !== fieldPer);
        setFields(values);
        delete permissionValue[key]
        setPermissionValue(permissionValue)
        delete genreValue[key]
        setGenreValue(genreValue)
    }
    console.log('fields',fields)

    const formSubmit = async (e) => {
        e.preventDefault()
        if(check) {
            try {
                const res = await axios.put(`users/permission/${userId}`, {premium: check})
                console.log(res)
                closeModal();
            }catch (err) {
                console.error(err)
            }
        }

        try {
            const res = await axios.put(`users/permission/${userId}`, {genre: Object.values(genreValue), limit: Object.values(permissionValue)})
            console.log(res)
            closeModal();
        }catch (err) {
            console.error(err)
        }

    }


    const handleClick = (name, value, idx) => {
        setPermissionValue(prev => ({...prev, [idx]: value}))
        setPermission({name: name, value:value})
    }

    const handleGenreClick = (name, value, idx) => {
        setGenreValue(prev => ({...prev, [idx]: value}))
        setGenre({name: name, value:value})
    }


    return (
        <>
            <StyledForm onSubmit={formSubmit}>
                <FlexContainer width='100%' flexDirection='column'>
                    <StyledCheckboxContainer>
                        <StyledCheckbox name='premium' type='checkbox' value="false" onChange={handleChangeCheck}/>
                        <p>Premium</p>
                    </StyledCheckboxContainer>
                    {check ? '' : fields.map((field, idx) => {
                        return (
                            <FlexContainer width='100%'
                                           justifyContent='space-between'
                                           alignItems='center'
                                           padding='10px 0 0 0'
                                           key={`${field}-${idx}`}>
                                <PermissionDropDown idx={field.permission} setData={setPermission}
                                                    defaultName={permission.name} list={PERMISSION_DROPDOWN_DATA}
                                                    handleClick={handleClick}/>
                                <PermissionDropDown idx={field.genre} setData={setGenre} defaultName={genre.name}
                                                    list={filterDataControlledDropDown(getGenre)}
                                                    handleClick={handleGenreClick}/>
                                {fields.length > 1 && idx === fields.length-1 ?
                                    <StyledIconContainer type='button'
                                                         onClick={() => handleRemove(idx, Object.keys(permissionValue)[idx], field.permission, genre.name)}>
                                        <DeleteIcon/>
                                    </StyledIconContainer> : <StyledIconContainer type='button'
                                                                                  opacity='0'
                                                                                  pointerEvents='none'>
                                        <DeleteIcon/>
                                    </StyledIconContainer>}
                                {fields.length - 1 === idx ? <StyledIconContainer type='button'
                                                                                   opacity={check ? '0.4' : '100'}
                                                                                   pointerEvents={check ? 'none' : ''}
                                                                                   onClick={() => handleAdd(idx)}>
                                    <AddIcon/>
                                </StyledIconContainer> : <StyledIconContainer type='button'
                                                                              opacity='0'
                                                                              pointerEvents='none'
                                >
                                    <AddIcon/>
                                </StyledIconContainer>}
                            </FlexContainer>
                        );
                    })}
                    <Button type='submit' disabled={permission.name === 'none' || genre.name === 'none'} width='50%'
                            alignSelf='center' margin='10px 0 0 0'>Submit</Button>
                </FlexContainer>
            </StyledForm>

        </>
    );
};

export default PermissionForm;

const StyledForm = styled.form`
  width: 100%;
`

const StyledCheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  margin: ${({margin}) => margin ? margin : '0'};
  p{
    margin-left: 10px;
  }
`

const StyledCheckbox = styled.input`
  width: 25px;
  height: 25px;
  background: ${({theme}) => theme.checkBox};
  cursor: pointer;
  display: ${({display}) => display ? display : 'inline-block'};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: ${({theme}) => theme.checkBox};

  &:checked:before {
    content: '\\2713';
    display: block;
    font-weight: bold;
    text-align: center;
    border: none;
    color: ${({theme}) => theme.checkMark};
    position: absolute;
    font-size: 20px;
    left: 0.5rem;
  }

`
const StyledIconContainer = styled.button`
  border: none;
  background: none;
  opacity: ${({opacity}) => opacity};
  pointer-events: ${({pointerEvents}) => pointerEvents};

  &:focus {
    outline: none;
  }

  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
    fill: ${({theme}) => theme.editDeleteIcon};

    path {
      fill: ${({theme}) => theme.editDeleteIcon};
    }
  }

`
