const { Contract } = require('fabric-contract-api');

class chaincodeClass extends Contract {

	async queryTask(ctx, taskNumber) {
		const taskAsBytes = await ctx.stub.getState(taskNumber)
		if (!taskAsBytes || taskAsBytes.length === 0) {
			throw new Error ('${taskNumber} non existant');
		}
		console.log(taskAsBytes.toString());
		return taskAsBytes.toString();
	}

	async queryProofTaskDone(ctx, proofNumber){
		const proofAsBytes = await ctx.stub.getState(proofNumber)
		if (!proofAsBytes || proofAsBytes.length === 0) {
			throw ne Error ('${proofNumber} non existant');
		}
		console.log(proofAsBytes.toString());
		return proofAsBytes.toString();
	}

	async createProofTaskDone(ctx, proofNumber, proofDocument){
		const proofTaskDone = {
			proofDocument,
			docType = 'proof',
		};

		await ctx.stub.putState(proofNumber, Buffer.from(JSON.stringify(proofTaskDone)));
		console.info('------------------ ok createProofTaskDone ------------------') 
	}

	async createTask(ctx, taskNumber, name, description, rewardAmount, address, state) {
		const task = {
			name,		
			description,
			rewardAmount,
			address,
			state,
			docType = 'task',
		};

		await ctx.stub.putState(taskNumber, Buffer.from(JSON.stringify(task)));
		console.info('------------------ ok createTask ------------------')
	}

	async validateTask(ctx, proofNumber, validation){
		const validateTask = {
			proofNumber,
			validatation,
		};

		await ctx.stub.putState(proofNumber, Buffer.from(JSON.stringify(validateTask)));
		console.info('------------------ ok validation ------------------)
	}

	async createUser(ctx, idUser, levelRight, name, amountCoin){
		const user = {
			idUser,
			levelRight,
			name,
			amountCoin,
		}

		await ctx.stub.putState(idUser, Buffer.from(JSON.stringify(user)));
		console.info('------------------ ok create user ------------------')
	}

	/*async transaction(ctx, idSource, idDest, amount){
		const loadIdSource = await ctx.stub.getState(idSource);
		const loadIdDest = await ctx.stub.getState(idDest);

		if (!loadIdSource || loadIdSource.length === 0) {
			throw new Error ('${idSource} idSource non existant');
		}

		if (!loadIdDest || loadIdDest.length === 0){
			throw new Error ('${idDest} idDest non existant');
		}

		if (amount < 0){
			throw new Error ('Le montant de la transaction ne peut pas être negative')
		}

		const source = JSON.parse(loadIdSource.toString());
		source.amountCoin = source.amountCoin - amount

		const dest = JSON.parse(loadIdDest.toString());
		dest.amountCoin = dest.amountCoin + amount

		await ctx.stub.putState(idSource, Buffer.from(JSON.stringify(source)));
		await ctx.stub.putState(idDest, Buffer.from(JSON.stringify(dest)));

		console.info('------------------ ok transaction ------------------')
	}*/

	async createCoin(ctx, idCoin, idUser){
		const coin = {
			idCoin,
			idUser,
		}

		await ctx.stub.putState(idCoin, Buffer.from(JSON.stringify(coin)));
		console.info('------------------ ok creation coin ------------------')
	}

	async sendCoin(ctx, idCoin, idNewOwner){
		const coinAsBytes = await ctx.stub.getState(coinNumber);
		if (!coinAsBytes || coinAsBytes.length === 0){
			throw new Error ('This coin does not exist');
		}
		const coin = JSON.parse(coinAsBytes.toString());
		coin.owner = idNewOwner;

		await ctx.stub.putState(idCoin, Buffer.from(JSON.stringify(coin)));
		console.info('------------------ ok transaction ------------------')
	}
}
