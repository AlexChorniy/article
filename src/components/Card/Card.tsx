import {BottomBlock, ButtonsBlock, Container, Image, Link, Title, TopBlock} from './styles';
import {SyntheticEvent, useState} from 'react';
import Input from "../Input";
import {Button} from "../styles";

type CardType = {
    title: string,
    url: string,
    imageUrl: string,
    onDeleteHandler: () => void,
    onEditHandler: (text: string) => void,
};

const Card = ({title, url, imageUrl, onDeleteHandler, onEditHandler}: CardType): JSX.Element => {
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(title);

    const onSaveHandler = () => {
        setEdit(false);
        onEditHandler(text);
    };

    const onChangeHandler = (event: SyntheticEvent) => {
        const value = (event.target as HTMLInputElement).value;
        setText(value);
    };

    return (
        <Container>
            <TopBlock>
                <Link href={url} target="_blank" rel="noopener noreferrer">
                    <Image alt="article image" src={imageUrl}/>
                </Link>
            </TopBlock>
            <BottomBlock>
                {edit ? (
                    <Input onChangeHandler={onChangeHandler} onSaveHandler={onSaveHandler} text={text}/>
                ) : (
                    <Title>{title}</Title>
                )}
                <ButtonsBlock>
                    <Button disabled={edit} onClick={() => setEdit(true)}>Edit</Button>
                    <Button onClick={() => onDeleteHandler()}>Delete</Button>
                </ButtonsBlock>
            </BottomBlock>
        </Container>
    );
};

export default Card;
