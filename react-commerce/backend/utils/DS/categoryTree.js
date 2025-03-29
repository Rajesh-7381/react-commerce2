class TreeNode{
    constructor(category){
        this.id=category.id;  //  stores category id 
        this.name=category.name; //  stores category name 
        this.parentId=category.parentId; //  stores category parentId 
        this.chilidren=[] // intialize empty array for child nodes
    }
}

class CategoryTree{
    constructor(){
        this.nodes={};  // A hash map for quick access to nodes
        this.root=new TreeNode({id: null,name:'Root',parentId:null})  // Root node of the tree
    }

    addCategory(category){
        const newNode=new TreeNode(category);
        this.nodes[category.id]=newNode;
        const parent=this.nodes[category.parentId] || this.root;
        parent.chilidren.push(newNode)
    }

    getTree(){
        return this.root;
    }
}

module.exports=CategoryTree