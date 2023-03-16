import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import LocalStorageHandler from './save';
import MaterialList from './MaterialList';
import ProductList from './ProductList';
//import './App.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function Main() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Home');
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    handleDrawerClose();
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter((material) => material.id !== id));
  };

  const handleUpdate = (updatedMaterial) => {
    const updatedMaterials = materials.map((material) =>
      material.id === updatedMaterial.id ? updatedMaterial : material
    );
    setMaterials(updatedMaterials);
  };

  const handleAdd = (newMaterial) => {
    setMaterials([...materials, newMaterial]);
 
};

const handleDeleteProduct = (id) => {
  setProducts(products.filter((product) => product.id !== id));
};

const handleUpdateProduct = (updatedProduct) => {
  const updatedProducts = products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
  setProducts(updatedProducts);
};

const handleAddProduct = (newProduct) => {
  setProducts([...products, newProduct]);
};

const drawer = (
    <div>
<div className={classes.drawerHeader}>
<IconButton onClick={handleDrawerClose}>
<ChevronLeftIcon />
</IconButton>
</div>

<Divider />
<List>
{['Home', 'Materials', 'Products'].map((text, index) => (
<ListItem button key={text} onClick={() => handleMenuItemClick(text)}>
<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
<ListItemText primary={text} />
</ListItem>

))}
</List>
</div>
);

let content;
if (selectedMenuItem === 'Materials') {
  content = <MaterialList materials={materials} onDelete={handleDelete} onUpdate={handleUpdate} onAdd={handleAdd} />;
} else if (selectedMenuItem === 'Products') {
  
  content = <ProductList products={products} onDelete={handleDeleteProduct} onUpdate={handleUpdateProduct} onAdd={handleAddProduct} materials={materials} />;
} else {
content = <LocalStorageHandler materials={materials} products={products} />;
}

return (
    <div className={classes.root}>
<AppBar position="fixed" className={open ? classes.appBarShift : classes.appBar}>
<Toolbar>
<IconButton
color="inherit"
aria-label="open drawer"
onClick={handleDrawerOpen}

edge="start"
className={open ? classes.hide : classes.menuButton}
>

<MenuIcon />
</IconButton>
<Typography variant="h6" noWrap>
My App
</Typography>
</Toolbar>
</AppBar>
<Drawer
className={classes.drawer}
variant="persistent"
anchor="left"
open={open}

classes = {
    {
      paper: classes.drawerPaper,
    }
  } >
  { drawer }
</Drawer> <
main className = { open ? classes.contentShift : classes.content } >
  <div className={classes.drawerHeader} /> { content }
</main>

</div>
);
}

export default Main;