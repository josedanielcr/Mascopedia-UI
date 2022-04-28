/**
 * Table component.
 * @author jcanalesr.
 * @since  2.10.2022
 */
 import { 
    AfterViewInit, 
    Component, 
    EventEmitter, 
    Input, 
    OnChanges, 
    OnInit, 
    Output, 
    SimpleChanges, 
    ViewChild 
  } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { MatTable, MatTableDataSource } from '@angular/material/table';
  import { TableColumns } from 'src/app/interfaces/tableColumn';
  
  @Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
  })
  export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  
    @Input() inputData                 : any[]; 
    @Input() columns                   : TableColumns[];
    @Output() dataToUse                = new EventEmitter<any>();
    public displayedColumns            : any;
    public dataSource                  : any;
    @ViewChild(MatPaginator) paginator : MatPaginator;
    @ViewChild(MatSort) sort           : MatSort;
  
    constructor() {}
  
    /**
    * calls setData to add the data to the table
    * @since      2.10.2022
    * @author     jcanalesr
    **/ 
    ngOnInit(): void {
      this.setData();    
    }
  
    /**
    * Calls table configurations
    * @since      2.10.2022
    * @author     jcanalesr
    **/ 
    ngAfterViewInit(): void {
      this.setTableConfig();
    }
  
    /**
    * Configurations for the table
    * @since      2.10.2022
    * @author     jcanalesr
    * @access     private
    **/ 
    private setTableConfig(){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort      = this.sort;
    }
  
    /**
    * Set inputData to the datasource of the table
    * @since      2.10.2022
    * @author     jcanalesr
    * @access     private
    **/ 
    private setData(){
      this.dataSource = new MatTableDataSource<any>(this.inputData); 
      this.displayedColumns = this.columns.map(c => c.columnDef);
    }
  
    /**
    * Detects every change in the inputData, so it can refresh the table
    * @since      2.12.2022
    * @author     jcanalesr
    **/ 
    ngOnChanges(changes: SimpleChanges) {
      if (!changes['inputData'].firstChange) {     
        this.setData();
        this.setTableConfig();
      }
    }
  
    /**
    * Filter for the table
    * @since      2.10.2022
    * @author     jcanalesr
    * @access     public 
    **/ 
    public applyFilter( event : Event ) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    /**
    * Sends all the object selected of the table
    * @since      2.10.2022
    * @author     jcanalesr
    * @access     public 
    **/ 
    public sendRowToParent( row ){
      this.dataToUse.emit( row );
    }
    
  }