// In-memory data store for MERN web application (no database needed)
let items = [
  {
    id: '1',
    title: 'Explore MERN Stack Architecture',
    description: 'Learn how React communicates with an Express and Node.js REST API.',
    category: 'Learning',
    priority: 'High',
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: '2',
    title: 'Build Express REST Endpoints',
    description: 'Provide GET, POST, PUT, and DELETE operations with in-memory persistence.',
    category: 'Backend',
    priority: 'High',
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: '3',
    title: 'Connect React Frontend with Vite',
    description: 'Fetch backend data asynchronously and render dynamic UI with state updates.',
    category: 'Frontend',
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Style Dashboard with Modern UI',
    description: 'Create responsive card layouts, badges, filter controls, and status indicators.',
    category: 'Design',
    priority: 'Low',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

export const getItems = (search = '', category = '', status = 'all') => {
  return items.filter(item => {
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !category || category.toLowerCase() === 'all' ||
      item.category.toLowerCase() === category.toLowerCase();

    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && item.completed) ||
      (status === 'active' && !item.completed);

    return matchesSearch && matchesCategory && matchesStatus;
  });
};

export const getItemById = (id) => {
  return items.find(item => item.id === String(id)) || null;
};

export const createItem = ({ title, description = '', category = 'General', priority = 'Medium' }) => {
  const newItem = {
    id: Date.now().toString(),
    title: title.trim(),
    description: description.trim(),
    category: category.trim() || 'General',
    priority: priority || 'Medium',
    completed: false,
    createdAt: new Date().toISOString()
  };
  items.unshift(newItem);
  return newItem;
};

export const updateItem = (id, updates) => {
  const index = items.findIndex(item => item.id === String(id));
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    ...updates,
    id: items[index].id, // protect id
    createdAt: items[index].createdAt, // protect createdAt
    updatedAt: new Date().toISOString()
  };

  return items[index];
};

export const deleteItem = (id) => {
  const index = items.findIndex(item => item.id === String(id));
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
};
