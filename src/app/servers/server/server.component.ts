import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // plus sign converts string to number ex. '1' to 1
    const id = +this.route.snapshot.params['id']
    this.server = this.serversService.getServer(id);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params['id']);
        }
      )
  }

  onEdit() {
    // preserves the query params information rather than the default. 'merge' will add any new query params
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});

  }

}
