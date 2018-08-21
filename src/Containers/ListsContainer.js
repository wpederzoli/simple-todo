import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUpAllTasks, addTask, updateTask, moveTask, deleteTask } from '../Actions';
import ListComponent from '../Components/ListComponent';
import { Grid } from '@material-ui/core';

export class ListsContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            addTodo: false,
            addProgress: false,
            addDone: false,
            addTodoInput: '',
            addProgressInput: '',
            addDoneInput: '',
            editTask: {}
        };
        this.addTask = this.addTask.bind(this);
        this.cancelAddTask = this.cancelAddTask.bind(this);
        this.confirmAddTask = this.confirmAddTask.bind(this);
        this.handleAddTaskInput = this.handleAddTaskInput.bind(this);
        this.editTask = this.editTask.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.confirmEditTask = this.confirmEditTask.bind(this);
        this.moveTask = this.moveTask.bind(this);
    }

    componentDidMount(){
        this.props.setUpAllTasks();
    }

    addTask(type){
        switch(type){
        case 'todo':
            this.setState({ addTodo: true });
            break;
        case 'progress':
            this.setState({ addProgress: true });
            break;
        case 'done':
            this.setState({ addDone: true });
            break;
        default:
            break;
        }
    }

    cancelAddTask(type){
        switch(type){
        case 'todo':
            this.setState({ addTodo: false });
            break;
        case 'progress':
            this.setState({ addProgress: false });
            break;
        case 'done':
            this.setState({ addDone: false });
            break;
        default:
            break;
        }
    }

    confirmAddTask(type, task){
        if(task !== ''){
            this.props.addTask(type, task);
            switch(type){
            case 'todo':
                this.setState({ addTodo: false, addTodoInput: '' });
                break;
            case 'progress':
                this.setState({ addProgress: false, addProgressInput: '' });
                break;
            case 'done':
                this.setState({ addDone: false, addDoneProgress: '' });
                break;
            default:
                break;
            }
        }
    }

    handleAddTaskInput(e, type){
        switch(type){
        case 'todo':
            this.setState({ addTodoInput: e.target.value });
            break;
        case 'progress':
            this.setState({ addProgressInput: e.target.value });
            break;
        case 'done':
            this.setState({ addDoneInput: e.target.value });
            break;
        default:
            break;
        }
    }

    editTask(task){
        this.setState({ editTask: task });
    }

    handleEditTask(e){
        this.setState({
            editTask: {...this.state.editTask, task: e.target.value }
        });
    }

    confirmEditTask(task){
        if(this.state.editTask.task !== ''){
            this.props.updateTask(task);
            this.setState({ editTask: {} });
        }
    }

    moveTask(task, type){
        if(type === 'delete'){
            this.props.deleteTask(task);
        }else{
            this.props.moveTask(task, type);
        }
    }

    render(){
        return(
            <Grid container spacing={8}>
                <ListComponent 
                    data={this.props.todo}
                    addTask={this.state.addTodo}
                    addTaskInput={e => this.handleAddTaskInput(e, 'todo')}
                    addTaskInputValue={this.state.addTodoInput}
                    confirmAddTask={() => this.confirmAddTask('todo', this.state.addTodoInput)}
                    cancelAddTask={() => this.cancelAddTask('todo')} 
                    onClick={() => this.addTask('todo')} 
                    onEditTask={this.editTask} 
                    editableTask={this.state.editTask} 
                    editTask={e => this.handleEditTask(e)}
                    confirmEditTask={() => this.confirmEditTask(this.state.editTask)} 
                    moveTask={this.moveTask}/>
                <ListComponent 
                    data={this.props.progress}
                    addTask={this.state.addProgress}
                    addTaskInput={e => this.handleAddTaskInput(e, 'progress')}
                    addTaskInputValue={this.state.addProgressInput}
                    confirmAddTask={() => this.confirmAddTask('progress', this.state.addProgressInput)}
                    cancelAddTask={() => this.cancelAddTask('progress')} 
                    onClick={() => this.addTask('progress')}
                    onEditTask={this.editTask} 
                    editableTask={this.state.editTask} 
                    editTask={e => this.handleEditTask(e)}
                    confirmEditTask={() => this.confirmEditTask(this.state.editTask)} 
                    moveTask={this.moveTask} />
                <ListComponent 
                    data={this.props.done}
                    addTask={this.state.addDone} 
                    addTaskInput={e => this.handleAddTaskInput(e, 'done')}
                    addTaskInputValue={this.state.addDoneInput}
                    confirmAddTask={() => this.confirmAddTask('done', this.state.addDoneInput)}
                    cancelAddTask={() => this.cancelAddTask('done')}
                    onClick={() => this.addTask('done')}
                    onEditTask={this.editTask} 
                    editableTask={this.state.editTask} 
                    editTask={e => this.handleEditTask(e)}
                    confirmEditTask={() => this.confirmEditTask(this.state.editTask)} 
                    moveTask={this.moveTask} />
            </Grid>
        );
    }
}

ListsContainer.propTypes = {
    setUpAllTasks: PropTypes.func,
    todo: PropTypes.array.isRequired,
    progress: PropTypes.array.isRequired,
    done: PropTypes.array.isRequired,
    addTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    moveTask: PropTypes.func.isRequired
};

const mapStateToProps = state =>{
    const { todo, progress, done } = state.tasks;
    return{
        todo,
        progress,
        done,
    };
};



export default connect(mapStateToProps, { setUpAllTasks, addTask, updateTask, moveTask, deleteTask })(ListsContainer);