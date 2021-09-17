// Todo Class: Handles creating of Todo
class Todo {
	constructor( todo, author, description ) {
		this.todo = todo
		this.author = author
		this.description = description
	}
}

// UI Class: Handles display of Todos
class UI {
	static addTodo( todo ) {
		const todoContainer = document.querySelector( '.todo-container' )
		const todoItem = document.createElement( 'DIV' )
		todoItem.className = 'mb-4'
		todoItem.innerHTML = `
      <h3>${todo.todo}</h3>
      <p>${todo.description}</p>
      <p>- ${todo.author}</p>
      <button type="button" class="btn btn-danger btn-block delete">Delete Todo</button>
    `

		todoContainer.appendChild( todoItem )
	}

	static clearFormFields() {
		document.querySelector( '#todo-title' ).value = ''
		document.querySelector( '#todo-description' ).value = ''
		document.querySelector( '#todo-author' ).value = ''
	}

	static deleteTodo( el ) {
		if ( el.classList.contains( 'delete' ) ) {
			el.parentElement.remove()
		}
		UI.showAlert( 'Deleted todo', 'danger' )
	}

	static showAlert( msg, btnClass ) {
		const messageContainer = document.createElement( 'DIV' )
		messageContainer.className = `btn btn-${btnClass} alert`
		messageContainer.appendChild( document.createTextNode( msg ) )

		const containerTodo = document.querySelector( '.container' )
		const row = document.querySelector( '.row' )

		containerTodo.insertBefore( messageContainer, row )
		// clear the message after 2 seconds
		setTimeout( () => {
			document.querySelector( '.alert' ).remove()
		}, 2000 )
	}
}


// Events

// submit a new todo
document.addEventListener( 'submit', e => {
	e.preventDefault()
	const form = document.querySelector( '#form' )

	const todo = document.querySelector( '#todo-title' ).value
	const description = document.querySelector( '#todo-description' ).value
	const author = document.querySelector( '#todo-author' ).value

	if ( todo === '' || description === '' || author === '' ) {
		UI.showAlert( 'Please Fill In All The Fields', 'danger' )
	} else {
		UI.showAlert( 'Todo Submitted', 'success' )
		const newTodo = new Todo( todo, author, description )
		UI.addTodo( newTodo )
		UI.clearFormFields()
	}
} )

// delete todo when clicking delete button
document.querySelector( '.todo-container' ).addEventListener( 'click', e => {
	UI.deleteTodo( e.target )
} )