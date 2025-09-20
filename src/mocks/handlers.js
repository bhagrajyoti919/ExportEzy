import { http, HttpResponse } from 'msw';
import { shipments } from './data/shipments.json';
import { inventory } from './data/inventory.json';
import { clients } from './data/clients.json';

export const handlers = [
  // Shipments API
  http.get('/api/shipments', () => {
    return HttpResponse.json(shipments);
  }),

  http.get('/api/shipments/:id', ({ params }) => {
    const shipment = shipments.find(s => s.id === parseInt(params.id));
    if (!shipment) {
      return HttpResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }
    return HttpResponse.json(shipment);
  }),

  // Inventory API
  http.get('/api/inventory', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    
    let filteredInventory = inventory;
    
    if (search) {
      filteredInventory = inventory.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return HttpResponse.json(filteredInventory);
  }),

  // Clients API
  http.get('/api/clients', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    
    let filteredClients = clients;
    
    if (search) {
      filteredClients = clients.filter(client => 
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()) ||
        client.company.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return HttpResponse.json(filteredClients);
  }),

  // Dashboard stats
  http.get('/api/dashboard/stats', () => {
    const stats = {
      activeShipments: shipments.filter(s => s.status !== 'Delivered').length,
      lowStockItems: inventory.filter(item => item.stockLevel < 50).length,
      totalClients: clients.length,
      deliveredThisMonth: shipments.filter(s => s.status === 'Delivered').length
    };
    return HttpResponse.json(stats);
  })
];
