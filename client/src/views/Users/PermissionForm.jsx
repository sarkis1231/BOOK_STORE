import React,{useState,useEffect} from 'react';
import {FlexContainer} from "../../styled/layout.styled";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {ReactComponent as AddIcon} from "../../assets/svg/Add.svg";
import {ReactComponent as DeleteIcon} from "../../assets/svg/delete.svg";
import Button from "../../components/Reusable/Button";
import styled from "styled-components";
import {useForm} from "react-hook-form";

const PermissionForm = () => {
    let [check,setCheck] = useState(undefined);
    let handleChangeCheck = (e)=>{

        return setCheck(e.target.checked)
    };

    let[fields,setFields] = useState([]);

    function handleAdd(e) {
        const values = [...fields];
        values.push({ value: fields[0]});
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    const {register: inputRegister,handleSubmit: editHovSubmit, reset: editReset, errors} = useForm()
    const [genreArr,setGenreArr] = useState([]);
    const[permArr,setPermArr] = useState([]);
    const[dataArr,setDataArr] = useState([]);

    const hovSubmit= (data)=> {
        if (data.genre /*!genreArr.includes(data.genre)*/){
            genreArr.push(data.genre)
            setGenreArr([...genreArr])
        }

        if(data.permissions && !permArr.includes(data.permissions)){
            permArr.push(data.permissions)
            setPermArr([...permArr])
        }

    }



    useEffect(()=>{
        setDataArr([genreArr,permArr]);
    },[genreArr,permArr])
    return (
        <>
            <StyledForm onSubmit={editHovSubmit(hovSubmit)}>
                <FlexContainer width='100%' flexDirection='column'>
                    <FlexContainer width='100%' justifyContent='space-between' alignItems='center'>
                        <StyledCheckboxContainer>
                            <StyledCheckbox ref={inputRegister} type='checkbox' value="false" onChange={handleChangeCheck} />
                        </StyledCheckboxContainer>

                        <ControlledDropDown disabled ref={inputRegister} name='genre' url={'/genre'}
                                            defaultValue={'Genre' ? {
                                                name: 'genre',
                                                value: '1'
                                            } : {name: 'none', value: ''}}
                                            width='40%'
                                            error={errors}
                                            opacity={ check ? '0.4': '100'}
                                            pointerEvents={check ? 'none':''}
                        />
                        <ControlledDropDown disabled ref={inputRegister} name='permissions' url={'/genre'}
                                            defaultValue={'Permissions' ? {
                                                name: 'perm',
                                                value: '2'
                                            } : {name: 'none', value: ''}}
                                            width='40%'
                                            error={errors}
                                            opacity={ check ? '0.4': '100'}
                                            pointerEvents={check ? 'none':''}
                        />
                        <StyledIconContainer type='button'
                                             opacity={ check ? '0.4': '100'}
                                             pointerEvents={check ? 'none':''}
                                             onClick={()=> handleAdd()}>
                            <AddIcon></AddIcon>
                        </StyledIconContainer>


                    </FlexContainer>
                    {check? '' : fields.map((field, idx) => {
                        return (
                            <FlexContainer width='100%'
                                           justifyContent='space-between'
                                           alignItems='center'
                                           padding='10px 0 0 0'
                                           key={`${field}-${idx}`}>
                                <StyledCheckboxContainer margin='0 30px 0 0'>
                                    <StyledCheckbox type='checkbox' value="false" display='none' />
                                </StyledCheckboxContainer>

                                <ControlledDropDown ref={inputRegister} name='genre' url={'/genre'}
                                                    defaultValue={'Genre' ? {
                                                        name: 'genre',
                                                        value: '3',
                                                    } : {name: 'none', value: ''}}
                                                    width='40%'
                                                    error={errors}
                                />
                                <ControlledDropDown ref={inputRegister} name='permissions' url={'/genre'}
                                                    defaultValue={'Permissions' ? {
                                                        name: 'perm',
                                                        value: '4'
                                                    } : {name: 'none', value: ''}}
                                                    width='40%'
                                                    error={errors}
                                />
                                <StyledIconContainer type='button' onClick={()=> handleRemove(idx)}>
                                    <DeleteIcon />
                                </StyledIconContainer>
                            </FlexContainer>
                        );
                    })}
                    <Button type='submit' width='50%' alignSelf='center' margin='10px 0 0 0' >Submit</Button>
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
  margin: ${({margin})=> margin? margin: '0'};
`

const StyledCheckbox = styled.input`
  display: inline-block;
  width: 25px;
  height: 25px;
  background: ${({theme}) => theme.checkBox};
  cursor: pointer;
  display: ${({display})=> display? display: ''};
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border:none;
  border-radius: 4px;
  outline: none;
  background-color:${({theme}) => theme.checkBox};
  &:checked:before{
    content: '\\2713';
    display: block;
    font-weight: bold;
    text-align: center;
    border: none;
    color:${({theme}) =>theme.checkMark};
    position: absolute;
    font-size: 20px;
    left: 0.5rem;
  }
  
`
const StyledIconContainer = styled.button`
  border: none;
  background: none;
  opacity: ${({ opacity }) => opacity};
  pointer-events: ${({ pointerEvents }) => pointerEvents};
  &:focus{
    outline: none;
  }
  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
    fill: ${({theme}) => theme.editDeleteIcon};
    path{
      fill: ${({theme}) => theme.editDeleteIcon};
  }
  }

`
