import React, {useState} from 'react';
import {FlexContainer} from "../../styled/layout.styled";
import {ReactComponent as AddIcon} from "../../assets/svg/Add.svg";
import {ReactComponent as DeleteIcon} from "../../assets/svg/delete.svg";
import Button from "../../components/Reusable/Button";
import styled from "styled-components";
import {PERMISSION_DROPDOWN_DATA} from "../../constant";
import PermissionDropDown from "../../components/Reusable/PermissionDropDown";
import {filterDataControlledDropDown, filteredValue} from "../../utils";
import useFetch from "../../hooks/useFetch";

const PermissionForm = () => {
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
        setFields(prev => [...prev, {permission: prev[i].permission + 1, genre: prev[i].genre + 1}]);
        setPermission({name: 'none', value: 0})
        setGenre({name: 'none', value: 0})
    }

    function handleRemove(i, key) {
        const values = [...fields].filter((_, index) => index !== i);
        setFields(values);
        delete permissionValue[key]
        setPermissionValue(permissionValue)
        delete genreValue[key]
        setGenreValue(genreValue)
    }

    const formSubmit = (e) => {
        e.preventDefault()
        console.log('permission',Object.values(permissionValue))
        console.log('genre',Object.values(genreValue))
    }
    console.log(permission.name)

    const handleClick = (name, value, idx) => {
        setPermissionValue(prev => ({...prev, [idx]: value}))
        setPermission({name: name, value:value})
    }

    const handleGenreClick = (name, value, idx) => {
        console.log(name)
        setGenreValue(prev => ({...prev, [idx]: value}))
        setGenre({name: name, value:value})
    }
    console.log(genre)


    return (
        <>
            <StyledForm onSubmit={formSubmit}>
                <FlexContainer width='100%' flexDirection='column'>
                    <StyledCheckboxContainer>
                        <StyledCheckbox name='premium' type='checkbox' value="false" onChange={handleChangeCheck}/>
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
                                {fields.length !== 1 ?
                                    <StyledIconContainer type='button' onClick={() => handleRemove(idx, Object.keys(permissionValue)[idx])}>
                                        <DeleteIcon/>
                                    </StyledIconContainer> : null}
                                {fields.length - 1 === idx && <StyledIconContainer type='button'
                                                                                   opacity={check ? '0.4' : '100'}
                                                                                   pointerEvents={check ? 'none' : ''}
                                                                                   onClick={() => handleAdd(idx)}>
                                    <AddIcon/>
                                </StyledIconContainer>}
                            </FlexContainer>
                        );
                    })}
                    <Button type='submit' disabled={permission.name === 'none' || genre.name === 'none'} width='50%' alignSelf='center' margin='10px 0 0 0'>Submit</Button>
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
  display: inline-block;
  vertical-align: middle;
  margin: ${({margin}) => margin ? margin : '0'};
`

const StyledCheckbox = styled.input`
  display: inline-block;
  width: 25px;
  height: 25px;
  background: ${({theme}) => theme.checkBox};
  cursor: pointer;
  display: ${({display}) => display ? display : ''};
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
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
