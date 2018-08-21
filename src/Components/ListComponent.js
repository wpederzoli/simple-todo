import React from 'react';
import { Grid, Card, Button, CardContent, CardActions, TextField } from '@material-ui/core';
import { DeleteForever, Alarm, Done, AddCircle } from '@material-ui/icons';
import PropTypes from 'prop-types';

const ListComponent = ({ 
    data, 
    onClick, 
    addTask, 
    cancelAddTask, 
    confirmAddTask, 
    addTaskInput,
    addTaskInputValue,
    onEditTask,
    editableTask,
    editTask,
    confirmEditTask,
    moveTask,
}) => {
    return (
        <Grid item lg={4} md={4} xs={12}>
            <Card>
                <CardContent>
                    {
                        data && data.map((task, key) => {
                            return (
                                <Grid key={key} container spacing={8} justify='center' alignItems='center'>
                                    <Grid  item lg={6} md={6} xs={6}>
                                        {
                                            editableTask && task.id === editableTask.id ? 
                                                <TextField onChange={editTask} value={editableTask.task} onBlur={confirmEditTask} /> :
                                                <Button onClick={() => onEditTask(task)}><h3>{task.task}</h3></Button>
                                        }
                                    </Grid>
                                    {
                                        task.type === 'todo' &&
                                        <Grid item lg={2} md={2} xs={2}>
                                            <Button onClick={() => moveTask(task, 'progress')}>
                                                <Alarm />
                                            </Button>
                                        </Grid>
                                    }
                                    {
                                        task.type !== 'done' &&
                                        <Grid item lg={2} md={2} xs={2}>
                                            <Button onClick={() => moveTask(task, 'done')}>
                                                <Done />
                                            </Button>
                                        </Grid>
                                    }
                                    
                                    <Grid item lg={2} md={2} xs={2}>
                                        <Button onClick={() => moveTask(task, 'delete')}>
                                            <DeleteForever />
                                        </Button>
                                    </Grid>
                                </Grid>
                            );
                        })
                    }
                    <CardActions>
                        {
                            addTask ? 
                                <Grid container spacing={16} alignItems='center'>
                                    <Grid item lg={12} md={12} xs={12}>
                                        <TextField fullWidth onChange={addTaskInput} value={addTaskInputValue} />
                                    </Grid>
                                    <Grid container spacing={16} alignItems='center'>
                                        <Grid item>
                                            <Button onClick={confirmAddTask}>Ok</Button>
                                        </Grid>
                                        <Grid>
                                            <Button onClick={cancelAddTask}>Cancel</Button>
                                        </Grid>
                                    </Grid>
                                </Grid> :
                                <Button id='add_task' onClick={onClick}>
                                    <AddCircle />
                                </Button>
                        }
                        
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    );
};

ListComponent.propTypes = {
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    addTask: PropTypes.bool.isRequired,
    cancelAddTask: PropTypes.func.isRequired,
    confirmAddTask: PropTypes.func.isRequired,
    addTaskInput: PropTypes.func.isRequired,
    addTaskInputValue: PropTypes.string.isRequired,
    onEditTask: PropTypes.func.isRequired,
    editableTask: PropTypes.object.isRequired,
    editTask: PropTypes.func.isRequired,
    confirmEditTask: PropTypes.func.isRequired,
    moveTask: PropTypes.func.isRequired
};

export default ListComponent;