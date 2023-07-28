# desafio-node-clicksoft

Deploy: https://clicksoft-node.onrender.com
Observação: pode haver demora de respostas ao utilizar o link de deploy.

Esta API foi feita utilizando node.js e o framework Adonis!

Ela gerencia dados de alunos e professores utilizando o banco de dados relacional PostgreSQL.

Informações para utilizar a API.

*CREATE estudante: RF01: Permitir que aluno se cadastre na aplicação <br/>

	POST
	Rota: /api/students
	modelo body:{
		"name": "maike ",
  		"email": "maike@gnail.com",
  		"registration_number": "2192022",
  		"date_of_birth": "AAAA-MM-DD"  (a data deve seguir este formato)
	}
 
*UPDATE estudante: RF02: Permitir que aluno edite seus dados de cadastro

	UPDATE
	Rota: /api/students/:registrationAluno
	modelo body:
	{
		"name": "maike ",
  		"email": "maike@gnail.com",
  		"registration_number": "2192022",
  		"date_of_birth": "AAAA-MM-DD"  (a data deve seguir este formato)
	}	
	
*DELETE estudante: RF03: Permitir que aluno exclua seus dados de cadastro

	DELETE
	Rota: /api/students/:registrationAluno
	

*READ dados do estudante: RF04: Permitir que aluno consulte seus dados de cadastro

	GET
	Rota: /api/students/:registrationAluno
 
========================================================================
	
*CREATE professor: RF05: Permitir que professor se cadastre na aplicação

	POST
	Rota: /api/professors
	modelo body:{
		"name": "maike ",
  		"email": "maike@gnail.com",
  		"registration_number": "2192022",
  		"date_of_birth": "AAAA-MM-DD"  (a data deve seguir este formato)
	}
	
*UPDATE professor: RF06: Permitir que professor edite seus dados de cadastro

	PUT
	Rota: /api/professors/:registrationProfessor
	modelo body:
	{
		"name": "maike ",
  		"email": "maike@gnail.com",
  		"registration_number": "2192022",
  		"date_of_birth": "AAAA-MM-DD"  (a data deve seguir este formato)
	}
	
*DELETE professor: RF07: Permitir que professor exclua seus dados de cadastro

	DELETE
	Rota: /api/professors/:registrationProfessor
	

*READ dados do professor: RF08: Permitir que professor consulte seus dados de cadastro

	GET
	Rota: /api/professors/:registrationProfessor
	
========================================================================

	
*CREATE room: RF09: Permitir que professor cadastre uma nova sala

	POST
	Rota: /api/rooms/:registration/professor
	modelo body:
		{
		  "room_number": "20",
		  "capacity": 3,
		  "is_avaliable": true
		}
	
*UPDATE room: RF10: Permitir que professor edite os dados de uma sala

	PUT
	Rota: /api/rooms/:registrationProfessor/professor/:room
	modelo body:
	{
	  "room_number": "151",
	  "capacity": 20,
	  "is_avaliable": false
	}
	
*DELETE room: RF11: Permitir que professor exclua os dados de uma sala

	DELETE
	Rota: /api/rooms/:registrationProfessor/professor/:room
	

*READ dados do room: RF12: Permitir que professor consulte os dados de uma sala

	GET
	Rota: /api/rooms/:registrationProfessor/professor/:room

========================================================================

	
*CREATE allocation: RF13: Permitir que professor aloque um aluno em uma sala

	POST
	Rota: /api/allocations/professor
	modelo body:
		{
		  "room_number": "20",
		  "registration_professor": "27",
		  "email_student": "paulo@gnail.com"
		}
	
*DELETE allocation: RF14: Permitir que professor remova o aluno de uma sala

	DELETE
	Rota: /api/allocations/professor/:registrationProfessor/student/:idStudent/room/:room
	
*READ allocation: RF15: Permitir que professor consulte todos os alunos de uma sala

	GET
	Rota: /api/allocations/professor/:registrationProfessor/room/:room

*READ dados do allocation: RF16: Permitir que aluno consulte todas as salas que deverá comparecer

	GET
	Rota: /api/students/:registrationAluno/allocations

	
	
	
	
	
	
