const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
	# Esto es un curso en el sistema
	type Curso {
		id: ID!
		titulo: String!
		# Esta es la descipción del Curso
		descripcion: String!
		profesor: Profesor
		rating: Float @deprecated(reason: "No creemos más en los puntajes")
		comentarios: [Comentario]
	}

	type Profesor {
		id: ID!
		nombre: String!
		nacionalidad: String!
		genero: Genero
		cursos: [Curso]
	}

	enum Genero {
		MASCULINO
		FEMENINO
	}

	type Comentario {
		id: ID!
		nombre: String!
		cuerpo: String!
	}

	type Query {
		cursos: [Curso]
		profesores: [Profesor]
		curso(id: Int): Curso
		profesor(id: Int): Profesor
	}
`

const resolvers = {
	Query: {
		cursos: () => {
			return [{
				titulo: 'Curso de GraphQL',
				descripcion: 'Aprendiendo GraphQL',
				id: 1
			}, {
				titulo: 'Curso de PHP',
				descripcion: 'Aprendiendo PHP',
				id: 2
			}
			]
		}
	},
	Curso: {
		profesor: () => {
			return {
				nombre: 'Noel',
				nacionalidad: 'Boliviana'
			}
		},
		comentarios: () => {
      		return [{
          		nombre: 'Esnor',
          		cuerpo: '¡Buen video!'
        	}]
    	}
	}
}

const schema = makeExecutableSchema({ 
	typeDefs,
	resolvers
})

module.exports = schema