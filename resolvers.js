const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')

const resolvers = {
  Query: {
    cursos: () => Curso.query().eager('[profesor, comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),
    curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
    profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id),
    buscar: (_, args) => {
    	return [
    		Profesor.query().findById(3),
    		Curso.query().findById(1)
    	]
    }
  },
  ResultadoBusqueda: {
  	__resolveType: (obj) => {
  		if(obj.nombre) return 'Profesor'
  		else return 'Curso'
  	}
  },
  Mutation: {
    profesorAdd: (_, args) => {
    	return Profesor.query().insert(args.profesor)
    },
    profesorEdit: (_, args) => {
    	return Profesor.query().patchAndFetchById(args.profesorId, args.profesor)
    },
    profesorDelete: (_, args) => {
    	return Profesor.query().findById(args.profesorId).then((profesor) => {
    		return Profesor.query().deleteById(args.profesorId).then((filasBorradas) => {
    			if (filasBorradas) return profesor
    			else throw new Error(`El profesor con id ${args.profesorId} no se pudo eliminar`)
    		})
    	})
    },
    cursoAdd: (_, args) => {
    	return Curso.query().insert(args.curso)
    },
    cursoEdit: (_, args) => {
    	return Curso.query().patchAndFetchById(args.cursoId, args.curso)
    },
    cursoDelete: (_, args) => {
    	return Curso.query().findById(args.cursoId).then((profesor) => {
    		return Curso.query().deleteById(args.cursoId).then(() => curso)
    	})
    },
    comentarioAdd: (_, args) => {
    	return Comentario.query().insert(args.comentario)
    },
    comentarioEdit: (_, args) => {
    	return Comentario.query().patchAndFetchById(args.comentarioId, args.comentario)
    },
    comentarioDelete: (_, args) => {
    	return Comentario.query().findById(args.comentarioId).then((profesor) => {
    		return Comentario.query().deleteById(args.comentarioId).then(() => comentario)
    	})
    }
  }
}

module.exports = resolvers
