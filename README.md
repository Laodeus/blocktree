# Blocktree

Blocktree est une implémentation simplifiée d'une structure de données blockchain sous forme d'arbre, écrite en TypeScript et destinée à être utilisée avec Node.js.

## Fonctionnalités

- Création de blocs avec des transactions
- Ajout de blocs à l'arbre
- Récupération de l'état final d'un bloc
- Récupération de l'état à un bloc spécifique
- Suppression des clés

## Documentation

### Classe Transaction

constructor(key: string, value: string | null, deleteKey: boolean = false) : Crée une nouvelle transaction.

### Classe Block
constructor(index: number, transactions: Transaction[], parentHash: string) : Crée un nouveau bloc.
calculateHash(): string : Calcule le hash du bloc.

### Classe Blocktree

constructor() : Crée une nouvelle instance de Blocktree avec un bloc Genesis.
addBlock(transactions: Transaction[], parentHash: string): Block : Ajoute un nouveau bloc à l'arbre.
getFinalState(blockIndex: number): { [key: string]: string | null } : Récupère l'état final d'un bloc.
getBlock(index: number): Block | null : Récupère un bloc à un index spécifié.
getStateAtBlock(index: number): { [key: string]: string | null } | null : Récupère l'état à un index de bloc spécifié.

## Licence
Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus d'informations.

Contributions
Les contributions sont les bienvenues ! Pour contribuer, veuillez suivre ces étapes :

Clonez ce dépôt et créez une nouvelle branche avec vos modifications.
Soumette
