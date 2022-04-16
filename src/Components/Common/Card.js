import { useRef } from 'react';
import { PencilAltIcon, ReplyIcon, TrashIcon } from '@heroicons/react/solid';
import { FlexBox } from './FlexBox';
import { CardWrapper, TitleChip, Button } from './Card.styles';

function Card({
    title,
    description,
    id,
    setTodos,
    updateHandler,
    deleted,
    createDate,
    editTodoDate,
}) {
    const cardId = useRef();
    console.log(createDate);

    const deleteHandler = () => {
        const deleteElementId = parseInt(cardId.current.id);
        setTodos((prevTodos) => {
            let UpdateTodos = [...prevTodos];
            if (deleted) {
                for (let i = 0; i < UpdateTodos.length; i++) {
                    if (UpdateTodos[i].id === deleteElementId) {
                        UpdateTodos.splice(i, 1);
                        break;
                    }
                }
            } else {
                for (let i = 0; i < UpdateTodos.length; i++) {
                    if (UpdateTodos[i].id === deleteElementId) {
                        UpdateTodos[i].deleted = true;
                        break;
                    }
                }
            }
            localStorage.setItem('todos', JSON.stringify(UpdateTodos));
            return UpdateTodos;
        });
    };

    const restoreHandler = () => {
        const restoreElementId = parseInt(cardId.current.id);
        setTodos((prevTodos) => {
            let UpdateTodos = [...prevTodos];
            for (let i = 0; i < UpdateTodos.length; i++) {
                if (UpdateTodos[i].id === restoreElementId) {
                    UpdateTodos[i].deleted = false;
                    break;
                }
            }
            localStorage.setItem('todos', JSON.stringify(UpdateTodos));
            return UpdateTodos;
        });
    };

    const editHandler = () => {
        const editElementId = parseInt(cardId.current.id);
        updateHandler(editElementId);
    };

    return (
        <CardWrapper
            rowGap="20px"
            column
            id={id}
            ref={cardId}
            deleted={deleted}
        >
            <TitleChip justify="center" align="center">
                {title}
            </TitleChip>
            <p>{description}</p>
            <FlexBox align="center" justify="space-between" columnGap="10px">
                <em>
                    {editTodoDate ? 'Last Edited' : 'Created'}:<br />
                    <strong>{editTodoDate ? editTodoDate : createDate}</strong>
                </em>
                <FlexBox columnGap="10px">
                    {deleted && (
                        <Button restore>
                            <ReplyIcon
                                className="restore"
                                onClick={restoreHandler}
                            />
                        </Button>
                    )}
                    <Button edit>
                        <PencilAltIcon className="edit" onClick={editHandler} />
                    </Button>
                    <Button trash onClick={deleteHandler}>
                        <TrashIcon className="trash" />
                    </Button>
                </FlexBox>
            </FlexBox>
        </CardWrapper>
    );
}

export default Card;
