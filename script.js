$(document).ready(function () {

    //global variables
    var jobs = [
        "Dining Room Server Assistant***",
        "Employee Dining Room Crew***",
        "Fast Food Crew***",
        "Kitchen Crew***",
        "Laundry Help***",
        "Room Attendant***",
        "Activities Sales Agent",
        "Administrative Assistant Maintenance",
        "Asst. HR Manager",
        "Audit Clerk",
        "Bar Lead",
        "Barista",
        "Bartender",
        "Bell Porter",
        "Boiler Technician (D.L.)",
        "Bus Driver/Guide (D.L.)",
        "Bus Service Person (D.L.)",
        "Cafeteria Management",
        "Camper Services Attendants",
        "Campground Attendant (D.L.)",
        "Campground Management",
        "Carpenter (D.L.)",
        "Carpet Cleaning Technician (D.L.)",
        "Chef",
        "Cocktail Server",
        "Cook",
        "Cookout Entertainer",
        "Dining Room Host",
        "Dining Room Host Lead",
        "Dining Room Management",
        "Dining Room Server",
        "Distribution Center Associate",
        "Distribution Center Truck Driver (D.L.)",
        "Distribution Lead",
        "Dock Help (D.L.)",
        "Dorm Custodian",
        "Electrician (D.L.)",
        "Employee Dining Room Management",
        "Employee Pub Crew/Lead",
        "Fast Food Management",
        "Finish Floor Supervisor",
        "Fire Systems Technician (D.L.)",
        "Floor Cleaning Technician (D.L.)",
        "Food and Beverage Management",
        "Food and Beverage Office Assistant",
        "Front Office Management",
        "Furniture Mover (D.L.)",
        "General Accounting Office",
        "General Maintenance (D.L.)",
        "Guest Services Agent",
        "Guest Services Agent (Campground)",
        "Heavy Equipment Operator (D.L.)",
        "Housekeeping Management",
        "Housekeeping Room Inspector",
        "Housekeeping Trainer",
        "Housekeeping Office Assistant",
        "Housing Manager",
        "Internship",
        "Kitchen Technician (D.L.)",
        "Laundry Technician (D.L.)",
        "Laundry Truck Driver (D.L.)",
        "Linen Truck Driver  (D.L.)",
        "Location Controller/Assistant",
        "Locksmith (D.L.)",
        "Marina Fishing Guide (D.L.)",
        "Marina Manager (D.L.)",
        "Night Auditor",
        "Night Guest Services Agent",
        "Painter (D.L.)",
        "Pantry Supervisor",
        "Personnel Management",
        "Pianist",
        "Plumber (D.L.)",
        "Porter",
        "Preservation Maintenance Crew Craftsperson",
        "Recreation Coordinator (D.L.)",
        "Recreation Supervisor (D.L.)",
        "Recycling Technician (D.L.)",
        "Reservations Sales Agent",
        "Residence Coordinator",
        "Retail Management",
        "Retail Sales Associate",
        "R&M Staff Assistant",
        "Scenic Cruise Operator (D.L.)",
        "Seamstress",
        "Security Guard And Location Safety (D.L.)",
        "Senior Guest Services Agent (Campground)",
        "Snack Shop / Deli Supervisor",
        "Sous Chef",
        "Steward",
        "Storekeeper",
        "Tour Guide (D.L.)",
        "Touring Car Driver- Interpretive Guide Non CDL (D.L.)",
        "Traveling Night Auditor",
        "Vending Clerk",
        "Vending Driver (D.L.)",
        "Vending Service Technician",
        "Warehouse Manager",
        "Warehouse Help",
        "Warehouse Driver (OFI)",
        "Wash Deck Supervisor",
        "Wash Deck Lead",
        "Wrangler/Driver"
    ]
    var jobCount = 1;
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    const sections = [
        'jobselect',
        'aboutyou',
        'experience',
        'education',
        'considerations',
        'workEligible',
        'reference'
    ];

    let currentIndex = 0;

    // disability modal
    var modalEl = document.getElementById('confirmModal');

    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }

    // previous application check
    var questionModal = new bootstrap.Modal(document.getElementById('questionModal'));
    $('#disabilityConfirmed').on('click', function () {
        questionModal.show();
    });

    $('#alreadyYes').on('click', function () {
        questionModal.hide();
        const warningModal = new bootstrap.Modal(document.getElementById('alreadySubmittedModal'));
        warningModal.show();
    });


    //injecting data for jobs
    $(function () {
        var datalist = $('<datalist id="jobList"></datalist>');
        jobs.forEach(job => {
            datalist.append(`<option value="${job}"></option>`);
        });
        $('body').append(datalist);
    });

    //handling multiple jobs
    $('#addJobBtn').on('click', function () {
        const newInput = $(`
            <div class="input-group mb-2">
                <input list="jobList" class="form-control job-input" id="jobInput${jobCount}" placeholder="Type to search..." required>
                <button type="button" class="btn btn-outline-danger removeJobBtn">-</button>
            </div>
            `);
        $('#jobContainer').append(newInput);
    });

    $('#jobContainer').on('click', '.removeJobBtn', function () {
        $(this).closest('.input-group').remove();
    });

    //show drivers license input if D.L is selected
    $('#jobContainer').on('change', function () {
        const needsDL = $('.job-input').toArray().some(input =>
            $(input).val()?.toUpperCase().includes('D.L')
        );

        $('#dL').toggleClass('d-none', !needsDL);
        $('#driversLicense').prop('required', needsDL);

    })

    // add date picker if they're seasonal
    $('#seasonal').on('change', function () {
        if (this.checked) {
            $('#seasonalDates').removeClass('d-none');
            $('#seasonalStart, #seasonalEnd').prop('required', this.checked);
        }
        else {
            $('#seasonalDates').addClass('d-none');
            $('#seasonalStart, #seasonalEnd').prop('required', this.checked);
            $('#seasonalStart, #seasonalEnd').removeClass('is-invalid');
        }
    });

    //felony area
    $('input[name="felony"]').on('change', function () {
        const hasFelony = $(this).val() === 'Y';

        // 1. Show/Hide the details box
        $('#felonyDetails').toggleClass('d-none', !hasFelony);

        // 2. Toggle 'required' based on visibility
        $('#convictionDate, #felonyDetailsText').prop('required', hasFelony);

        // 3. Cleanup if they switch back to 'No'
        if (!hasFelony) {
            $('#convictionDate, #felonyDetailsText').val('').removeClass('is-invalid');
        }
    });

    //injecting employers as needed - ai generated form
    let employerCount = 1;

    $('#addEmployer').on('click', function () {
        const employerHtml = `
        <div class="card mb-4 employer-card border-0 bg-white">
                                                    <div class="card-body bg-light rounded">

                                                        <!-- Header -->
                                                        <div
                                                            class="d-flex justify-content-between align-items-center mb-3">
                                                            <strong class="text-uppercase small text-muted">
                                                                Employment History
                                                            </strong>
                                                            <button type="button"
                                                                class="btn text-white bg-danger btn-sm removeEmployer ms-auto">
                                                                Remove
                                                            </button>
                                                        </div>

                                                        <div class="row g-3">

                                                            <!-- Employer Info -->
                                                            <div class="col-md-6">
                                                                <label class="form-label small">Employer Name<span class="required">*</span></label>
                                                                <input type="text" class="form-control border-0"
                                                                    name="employerName[]" placeholder="Company Name"
                                                                    required>

                                                                <div class="invalid-feedback">
                                                                    Employer name is required.
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <label class="form-label small">Employer Phone<span class="required">*</span></label>
                                                                <input type="tel" class="form-control border-0"
                                                                    name="employerPhone[]" placeholder="(555) 555-5555"
                                                                    required>

                                                                <div class="invalid-feedback">
                                                                    Please enter a valid phone number.
                                                                </div>
                                                            </div>


                                                            <!-- Address -->
                                                            <div class="col-12">
                                                                <label class="form-label small">Street Address</label>
                                                                <input type="text" class="form-control border-0"
                                                                    name="employerStreet[]" placeholder="123 Main St">
                                                            </div>

                                                            <div class="col-md-4">
                                                                <label class="form-label small">City<span class="required">*</span></label>
                                                                <input type="text" class="form-control border-0"
                                                                    name="employerCity[]" required>
                                                                <div class="invalid-feedback">City is required.</div>
                                                            </div>

                                                            <div class="col-md-2">
                                                                <label class="form-label small">State<span class="required">*</span></label>
                                                                <input type="text" class="form-control border-0"
                                                                    name="employerState[]" required>
                                                                <div class="invalid-feedback">State is required.</div>
                                                            </div>

                                                            <div class="col-md-3">
                                                                <label class="form-label small">Zip Code<span class="required">*</span></label>
                                                                <input type="text" class="form-control border-0"
                                                                    name="employerZip[]" required>
                                                                <div class="invalid-feedback">Zip code is required.
                                                                </div>
                                                            </div>


                                                            <div class="col-md-3">
                                                                <label class="form-label small">Country</label>
                                                                <input type="text" class="form-control border-0"
                                                                    name="employerCountry[]" placeholder="Country">
                                                            </div>

                                                            <!-- Dates -->
                                                            <div class="col-md-6">
                                                                <label class="form-label small">Start Date<span class="required">*</span></label>
                                                                <input type="date" class="form-control border-0"
                                                                    name="startDate[]" required>

                                                                <div class="invalid-feedback">
                                                                    Start date is required.
                                                                </div>
                                                            </div>


                                                            <div class="col-md-6">
                                                                <label class="form-label small">End Date</label>
                                                                <input type="date" class="form-control border-0"
                                                                    name="endDate[]">
                                                            </div>

                                                            <!-- Position -->
                                                            <div class="col-12">
                                                                <label class="form-label small">Position / Job
                                                                    Title</label>
                                                                <input type="text" class="form-control border-0"
                                                                    name="position[]" placeholder="Job Title">
                                                            </div>

                                                            <!-- Duties -->
                                                            <div class="col-12">
                                                                <label class="form-label small">Primary Duties</label>
                                                                <textarea class="form-control border-0" rows="2"
                                                                    name="duties[]"
                                                                    placeholder="Brief description of responsibilities"></textarea>
                                                            </div>

                                                            <!-- Reason -->
                                                            <div class="col-12">
                                                                <label class="form-label small">Reason for
                                                                    Leaving</label>
                                                                <textarea class="form-control border-0" rows="2"
                                                                    name="reasonForLeaving[]"
                                                                    placeholder="Optional"></textarea>
                                                            </div>

                                                            <!-- Contact Permission -->
                                                            <div
                                                                class="col-12 d-flex justify-content-center flex-wrap mt-2">
                                                                <label class="form-label me-3 mb-0">
                                                                    May we contact this employer?<span class="required">*</span>
                                                                </label>

                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="contactEmployer${employerCount}"
                                                                        value="Yes" required>
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>

                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="contactEmployer${employerCount}"
                                                                        value="No" required>
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                            </div>


                                                        </div>
    `;

        $('#employerContainer').append(employerHtml);
        employerCount++;
    });

    $('#employerContainer').on('click', '.removeEmployer', function () {
        $(this).closest('.employer-card').remove();
    });

    // adding a place for previous park experience
    $('input[name="previouslyEmployed"]').on('change', function () {
        if ($(this).val() === 'Y') {
            $('#previousEmploymentDetails').removeClass('d-none');
        } else {
            $('#previousEmploymentDetails').addClass('d-none');

            // Optional: clear values when hidden
            $('#previousEmploymentDetails')
                .find('input, select')
                .val('');
        }
    });


    //adding education as needed

    let schoolCount = 0;

    $('#addSchool').on('click', function () {
        const schoolHtml = `
        <div class="card mb-3 school-card border-0 bg-transparent">
                                            <div class="card-body bg-light rounded">

                                                <!-- Header -->
                                                <div class="d-flex justify-content-between align-items-center mb-3">
                                                    <strong class="text-uppercase small text-muted">
                                                        Education History
                                                    </strong>
                                                    <button type="button"
                                                        class="btn text-white bg-danger btn-sm removeSchool">
                                                        Remove
                                                    </button>
                                                </div>

                                                <div class="row g-3">

                                                    <!-- School Name -->
                                                    <div class="col-md-6">
                                                        <label class="form-label small">
                                                            School Name <span class="required">*</span>
                                                        </label>
                                                        <input type="text" class="form-control border-0"
                                                            name="schoolName[]" placeholder="University or School Name"
                                                            required>
                                                        <div class="invalid-feedback">
                                                            School name is required.
                                                        </div>
                                                    </div>

                                                    <!-- Location -->
                                                    <div class="col-md-6">
                                                        <label class="form-label small">
                                                            Location <span class="required">*</span>
                                                        </label>
                                                        <input type="text" class="form-control border-0"
                                                            name="schoolLocation[]" placeholder="City, State" required>
                                                        <div class="invalid-feedback">
                                                            Location is required.
                                                        </div>
                                                    </div>

                                                    <!-- Degree -->
                                                    <div class="col-md-4">
                                                        <label class="form-label small">
                                                            Degree Received
                                                        </label>
                                                        <input type="text" class="form-control border-0" name="degree[]"
                                                            placeholder="Associate, Bachelor, etc.">
                                                    </div>

                                                    <!-- Field of Study -->
                                                    <div class="col-md-4">
                                                        <label class="form-label small">
                                                            Field of Study
                                                        </label>
                                                        <input type="text" class="form-control border-0"
                                                            name="fieldOfStudy[]" placeholder="Major or Program">
                                                    </div>

                                                    <!-- Graduate -->
                                                    <div
                                                        class="col-md-4 col-12 d-flex align-items-end justify-content-center">
                                                        <div class="text-center">
                                                            <label class="form-label small d-block mb-1">
                                                                Graduated? <span class="required">*</span>
                                                            </label>

                                                            <div class="form-check form-check-inline mb-0">
                                                                <input class="form-check-input square-radio"
                                                                    type="radio" name="graduate${schoolCount}" value="Y"
                                                                    id="gradYes${schoolCount}" required>
                                                                <label class="form-check-label"
                                                                    for="gradYes${schoolCount}">
                                                                    Yes
                                                                </label>
                                                            </div>

                                                            <div class="form-check form-check-inline mb-0">
                                                                <input class="form-check-input square-radio"
                                                                    type="radio" name="graduate${schoolCount}" value="N"
                                                                    id="gradNo${schoolCount}">
                                                                <label class="form-check-label"
                                                                    for="gradNo${schoolCount}">
                                                                    No
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
    `;

        $('#schoolContainer').append(schoolHtml);
        schoolCount++;
    });

    // Remove school
    $('#schoolContainer').on('click', '.removeSchool', function () {
        $(this).closest('.school-card').remove();
    });

    // work elibility 
    $('input[name="workEligible"]').on('change', function () {
        const sponsorSection = $('#sponsorSection');

        if (this.value === 'No') {
            sponsorSection.removeClass('d-none');
            $('#sponsorSection input[type="radio"][name="sponsoringAgency"]').each(function () {
                $(this).prop('required', true);
            });
        } else {
            sponsorSection.addClass('d-none');
            $('#sponsorSection input[type="radio"][name="sponsoringAgency"]').each(function () {
                $(this).prop('required', false);
            });
        }
    });



    // joint app display
    $('#yesJoint').on('change', function () {
        $('#jointAppDetails').toggleClass('d-none');
    })

    //rv card toggle

    $('input[name="housingPreference"]').on('change', function () {
        if (this.value === 'RV') {
            $('#rvDetails').removeClass('d-none');
        } else {
            $('#rvDetails')
                .addClass('d-none');
        }
    });

    //toggle relationships
    $('input[name="npsRelation"]').on('change', function () {
        if ($('#npsYes').is(':checked')) {
            $('#npsDetails').removeClass('d-none');

        } else {

            $('#npsDetails').addClass('d-none');
        }
    });


    //add references up to three
    let referenceCount = 0;

    function addReference() {
        if (referenceCount >= 3) return;

        const referenceHtml = `
        <div class="card mb-3 border-0 reference-card">
            <div class="card-body rounded  bg-light text-white">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <strong>Reference</strong>
                    <button type="button" class="btn btn-sm text-white bg-danger removeReference">
                        Remove
                    </button>
                </div>

                <div class="row g-3">
                    <div class="col-md-6">
                        <input type="text" class="form-control border-0"
                               name="referenceName[]" placeholder="Reference Name" required>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control border-0"
                               name="referenceRelationship[]" placeholder="Relationship" required>
                    </div>
                    <div class="col-md-6">
                        <input type="email" class="form-control border-0"
                               name="referenceEmail[]" placeholder="Email" required>
                    </div>
                    <div class="col-md-6">
                        <input type="tel" class="form-control border-0"
                               name="referencePhone[]" placeholder="Phone" required>
                    </div>
                </div>
            </div>
        </div>
    `;

        $('#referenceContainer').append(referenceHtml);
        referenceCount++;
    }

    $('#addReference').on('click', addReference);

    $('#referenceContainer').on('click', '.removeReference', function () {

        $(this).closest('.reference-card').remove();
        referenceCount--;

    });

    // handling closing panes when a button is clicked

    function isDesktop() {
        return window.innerWidth >= 768; // Bootstrap md+
    }

    if (isDesktop()) {
        $('.accordion-item').addClass('d-none');
        $('#top-jobselect').removeClass('d-none');

        $('.sidebar-link').removeClass('active fw-bold');
        $('.sidebar-link[href="#jobselect"]').addClass('active fw-bold');
    }

    $('.sidebar-link').on('click', function (e) {

        if (!isDesktop()) return;

        e.preventDefault();
        

        var target = $(this).attr('href').replace('#', '');
        var sectionToShow = '#top-' + target;

        // Hide all accordion items (header + body)
        $('.accordion-item').addClass('d-none');

        // Show selected section
        $(sectionToShow).removeClass('d-none');

        // Sidebar active styling
        $('.sidebar-link').removeClass('active fw-bold');
        $(this).addClass('active fw-bold');

        fixCurrentIndex(sectionToShow);
        $('#backBtn').toggle(currentIndex > 0);

        $('#nextBtn').toggle(currentIndex < sections.length - 1);


    });

    function fixCurrentIndex(sectionToShow) {
        for (let i = 0; i < sections.length; i++) {
            if ('#top-' + sections[i] === sectionToShow) {
                currentIndex = i;
                return;
            }
        }
    }

    const desktopQuery = window.matchMedia('(min-width: 768px)');

    function applyLayout(e) {
        if (e.matches) {
            // 🖥 Desktop
            $('.accordion-item').addClass('d-none');
            $('#top-jobselect').removeClass('d-none');

            $('.sidebar-link').removeClass('active fw-bold');
            $('.sidebar-link[href="#jobselect"]').addClass('active fw-bold');
        } else {
            // 📱 Mobile
            $('.accordion-item').removeClass('d-none');
            $('.sidebar-link').removeClass('active fw-bold');
        }
    }

    // Run once on load
    applyLayout(desktopQuery);

    // Listen for breakpoint changes
    desktopQuery.addEventListener('change', applyLayout);



    function showSection(index) {
        const id = sections[index];

        $('.accordion-item').addClass('d-none');
        $(`#top-${id}`).removeClass('d-none');

        $('.sidebar-link').removeClass('active fw-bold');
        $(`.sidebar-link[href="#${id}"]`).addClass('active fw-bold');

        // Back button visibility
        $('#backBtn').toggle(index > 0);

    }

    // Next
    $('#nextBtn').on('click', function (e) {

        const $currentForm = $('.accordion-item:not(.d-none) form');

        if ($currentForm.length) {
            const form = $currentForm[0];

            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                $currentForm.addClass('was-validated');
                return;
            }
        }

        // REVIEW MODE
        if ($('#nextBtn').text().includes('Review')) {
            $('.accordion-item').removeClass('d-none');
            $('#sidebarApply').removeClass('disabled d-none');
            $('#sectionNav').addClass('d-none');
            return;
        }

        const current = sections[currentIndex];

        // Mark current complete
        $(`.sidebar-link[href="#${current}"]`)
            .removeClass('disabled border-0');

        // Move forward
        currentIndex++;

        // If we're at the last section, switch button text
        if (currentIndex >= sections.length - 1) {
            $('#nextBtn').text('Review');
        }

        const next = sections[currentIndex];
        $(`.sidebar-link[href="#${next}"]`)
            .removeClass('disabled border-0');

        showSection(currentIndex);
    });


    // Back
    $('#backBtn').on('click', function () {
        if (currentIndex === 0) return;

        currentIndex--;
        // remove d-none from next if we go backwards
        $('#nextBtn').toggle(currentIndex < sections.length - 1);
        showSection(currentIndex);
    });

    currentIndex = 0;


    showSection(currentIndex);
    $('#sectionNav').removeClass('d-none');







});
