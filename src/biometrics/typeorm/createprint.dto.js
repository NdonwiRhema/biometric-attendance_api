

export class CreatePrintDto{
  
    print_id;

    device_id;

    owner_id;

   printTemplate;

    // will either be Idle or Await
    device_status;

}